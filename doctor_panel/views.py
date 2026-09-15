from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import OuterRef, Exists
from django.http import JsonResponse, HttpRequest
from django.shortcuts import render, get_object_or_404, redirect
# Create your views here.
from django.template.loader import render_to_string
from django.urls import reverse
from django.views.decorators.http import require_POST

from account_module.models import User
from doctor_panel.forms import WeeklyScheduleForm, editPeriodForm, ScheduleExceptionForm, ProfileForm, DoctorForm
from doctors_module.models import Doctor, WeeklySchedule, SchedulePeriod, AvailableSlot, Appointment, ScheduleException, \
    Specialty
from doctors_module.service import generate_slots_for_days, generate_slots_for_date
from datetime import date, timedelta

@login_required
def doctor_panel(request):
    weekday_form = WeeklyScheduleForm()
    period_form = editPeriodForm()
    exeption_form = ScheduleExceptionForm()
    user = request.user.id
    get_user = User.objects.filter(id=user).first()
    if not Doctor.objects.filter(user_id=request.user.id).exists():
        return redirect(reverse('home'))
    doctor = Doctor.objects.get(user_id=request.user.id)
    profile_form = ProfileForm(instance=get_user)
    doctor_form = DoctorForm(instance=doctor)


    if request.method == 'POST':
        weekday_form = WeeklyScheduleForm(request.POST)
        if weekday_form.is_valid():


            weekday = weekday_form.cleaned_data['weekday']
            start_time = weekday_form.cleaned_data['start_time']
            end_time = weekday_form.cleaned_data['end_time']
            duration = weekday_form.cleaned_data['duration']

            schedule, created = WeeklySchedule.objects.get_or_create(
                doctor=doctor,
                weekday=weekday,
                defaults={'is_active': True}
            )
            SchedulePeriod.objects.create(
                schedule=schedule,
                start_time=start_time,
                end_time=end_time,
                duration=duration
            )
            generate_slots_for_days(
                doctor=doctor,
                days=30
            )
    schedules_work = WeeklySchedule.objects.filter(doctor=doctor).prefetch_related('periods').order_by('weekday')
    exception_work = ScheduleException.objects.filter(is_available=True, doctor=doctor)
    context = {
        'weekday_form': weekday_form,
        'doctor': doctor,
        'schedules_work': schedules_work,
        'period_form': period_form,
        'exeption_form': exeption_form,
        'exception_work': exception_work,
        'profile_form': profile_form,
        'doctor_form': doctor_form,
    }
    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return JsonResponse({
            'list_management_working': render_to_string('doctor_panel/include/list_management_working.html', context),
        })
    return render(request, 'doctor_panel/doctor_dashboard.html', context)

@require_POST
def active_inactive_appointment(request, pk):

    schedule = get_object_or_404(WeeklySchedule, id=pk, doctor__user=request.user)

    schedule.is_active = not schedule.is_active
    schedule.save(update_fields=['is_active'])

    today = date.today()

    for i in range(30):

        target_date = today + timedelta(days=i)

        weekday = (target_date.weekday() + 2) % 7

        if weekday == schedule.weekday:

            AvailableSlot.objects.filter(doctor=schedule.doctor, date=target_date).update(is_available=schedule.is_active)


    return JsonResponse({
        'success': True,
        'is_active': schedule.is_active
    })

@require_POST
@transaction.atomic
def editPeriodWorking(request, pk):

    doctor = get_object_or_404(Doctor,user_id=request.user.id)

    period = SchedulePeriod.objects.filter(id=pk,schedule__doctor=doctor).select_related('schedule').first()

    if not period:
        return JsonResponse({
            'success': False,
            'message': 'بازه زمانی یافت نشد'
        })

    period_form = editPeriodForm(request.POST)

    if not period_form.is_valid():
        return JsonResponse({
            'success': False,
            'message': 'اطلاعات وارد شده معتبر نمی باشد'
        })


    old_start_time = period.start_time
    old_end_time = period.end_time

    weekday = period.schedule.weekday

    new_start_time = period_form.cleaned_data['edit_start_time']
    new_end_time = period_form.cleaned_data['edit_end_time']
    new_duration = period_form.cleaned_data['edit_duration']


    booked_slots = Appointment.objects.filter(available_slot=OuterRef('pk'))

    def is_schedule_weekday(target_date):

        python_weekday = target_date.weekday()

        return (python_weekday + 2) % 7 == weekday


    for i in range(30):

        target_date = date.today() + timedelta(days=i)

        if not is_schedule_weekday(target_date):
            continue

        AvailableSlot.objects.filter(doctor=doctor, date=target_date, start_time__gte=old_start_time, start_time__lt=old_end_time).annotate(has_appointment=Exists(booked_slots)).filter(has_appointment=False).delete()


    period.start_time = new_start_time
    period.end_time = new_end_time
    period.duration = new_duration

    period.save()

    for i in range(30):

        target_date = date.today() + timedelta(days=i)

        if not is_schedule_weekday(target_date):
            continue

        generate_slots_for_date(doctor=doctor,date=target_date)

    # ===== AFTER =====
    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        schedule_work = period.schedule
        context = {
            'schedule_work': schedule_work,

        }
        return JsonResponse({
            'success': True,
            'day_id': schedule_work.id,
            'list_management_working': render_to_string(
                'doctor_panel/include/period_day.html', context
            )
        })

    return JsonResponse({
        'success': True
    })

@require_POST
def exception_day(request: HttpRequest):
    user_id = request.user.id
    doctor = Doctor.objects.filter(user_id=user_id).first()
    if not doctor:
        return JsonResponse({
            'success': False,
            'message': 'پزشک مورد نظر یافت نشد'
        })
    if request.method == 'POST':
        exception_form = ScheduleExceptionForm(request.POST)
        print(exception_form)
        print(request.POST.get('date'))
        if exception_form.is_valid():
            date = exception_form.cleaned_data['date_hidden']
            start_time = exception_form.cleaned_data['exception_start_time'] or None
            end_time = exception_form.cleaned_data['exception_end_time'] or None
            duration = exception_form.cleaned_data['duration'] or None
            reason = exception_form.cleaned_data['reason']

            new_exception = ScheduleException(doctor=doctor, date=date, start_time=start_time, end_time=end_time, duration=duration, reason=reason, is_available=True)
            new_exception.save()

            slot = AvailableSlot.objects.filter(doctor=doctor, is_available=True, date=new_exception.date)
            slot.delete()
            exception_day = ScheduleException.objects.filter(is_available=True, doctor=doctor).order_by('date')
            generate_slots_for_days(doctor=doctor)
            if request.headers.get("X-Requested-With") == "XMLHttpRequest":

                context = {
                    'exception_work': exception_day
                }
                return JsonResponse({
                    'success': True,
                    'exception_day': render_to_string('doctor_panel/include/exception_day.html', context)
                })
            return JsonResponse({
                'success': True,
                'message': 'بازه کاری با موفقیت اضافه شد'
            })
        return JsonResponse({
            'success': False,
            'message': 'اطلاعات وارد شده معتبر نیست'
        })
    return JsonResponse({
        'success': False,
        'message': 'درخواست معتبر نمی باشد'
    })

@require_POST
def delete_exception_day(request, pk):
    user_id = request.user.id

    doctor = Doctor.objects.filter(user_id=user_id).first()

    if not doctor:
        return JsonResponse({
            'success': False,
            'message': 'پزشک پیدا نشد'
        })

    exception_day = ScheduleException.objects.filter(id=pk, doctor=doctor, is_available=True).first()

    if not exception_day:
        return JsonResponse({
            'success': False,
            'message': 'روز استثنا پیدا نشد'
        })

    available_slots = AvailableSlot.objects.filter(date=exception_day.date,doctor=doctor)

    available_slots.delete()
    exception_day.delete()

    exception_days = ScheduleException.objects.filter(doctor=doctor,is_available=True).order_by('date')

    context = {
        'exception_work': exception_days
    }

    return JsonResponse({
        'success': True,
        'exception_day': render_to_string('doctor_panel/include/exception_day.html',context)
    })

@require_POST
def EditProfile(request):
    user_id = request.user.id
    user = User.objects.filter(id=user_id).first()
    doctor = Doctor.objects.filter(user=user).prefetch_related('specialties', 'clinics').select_related('user').first()
    if not user and not doctor:
        return JsonResponse({
            'success': False,
            'message': 'پزشک پیدا نشد'
        })

    doctor_form = DoctorForm(request.POST, instance=doctor)
    profile_form = ProfileForm(request.POST, request.FILES, instance=user)

    if profile_form.is_valid() and doctor_form.is_valid():
        print('form valid')
        profile_form.save()
        doctor_form.save()
        profile_form = ProfileForm(instance=user)
        doctor_form = DoctorForm(instance=doctor)
        user = User.objects.get(id=request.user.id)
        doctor = Doctor.objects.filter(user=user).prefetch_related('specialties', 'clinics').select_related('user').first()

        context = {
            'doctor': doctor,
            'profile_form': profile_form,
            'doctor_form': doctor_form,
            'user': user

        }
        return JsonResponse({
            'profile_doctor': render_to_string('doctor_panel/include/profile.html', context, request=request)
        })
    return JsonResponse({
        'success': False,
        'message': 'اطلاعات وارد شده معتبر نیست'
    })
