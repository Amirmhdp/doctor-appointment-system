from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.db.models import Avg
from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils import timezone
from django.views.decorators.http import require_POST
from account_module.models import User
from doctors_module.models import Appointment
from patient.models import FavoriteDoctor
from user_panel.forms import ProfileForm

@login_required
def user_panel(request):

    patient = request.user.id
    today = timezone.localdate()
    user = request.user
    profile_form = ProfileForm(instance=user)
    appointments = Appointment.objects.filter(patient__user_id=patient,status__in=['pending', 'confirmed']).select_related('doctor__user','available_slot', ).prefetch_related('doctor__specialties', ).order_by('available_slot__date', 'available_slot__start_time')
    favorite_doctors = FavoriteDoctor.objects.filter(patient__user=user).select_related('doctor__user').prefetch_related('doctor__specialties')
    upcoming_appointments = appointments.filter(status__in=['pending', 'confirmed'],available_slot__date__gte=today).order_by('available_slot__date', 'available_slot__start_time')
    past_appointments = Appointment.objects.filter(status='completed',patient__user_id=patient).order_by('available_slot__date', 'available_slot__start_time')
    cancelled_appointments = Appointment.objects.filter(status='cancelled', patient__user_id=patient).order_by('-available_slot__date', '-available_slot__start_time')
    next_appointment = upcoming_appointments.first()
    favorite_doctors = favorite_doctors.annotate(avg_rating=Avg('doctor__comments__rating'))
    context = {
        'appointments': appointments,
        'upcoming_appointments': upcoming_appointments,
        'past_appointments': past_appointments,
        'cancelled_appointments': cancelled_appointments,
        'profile_form': profile_form,
        'next_appointment': next_appointment,
        'favorite_doctors': favorite_doctors,
    }

    return render(request,'user_panel/user_panel.html',context)

@require_POST
def show_canceled(request, pk):

    appointment = Appointment.objects.filter(id=pk, available_slot__is_available=False).select_related('doctor__user', 'available_slot').first()

    if not appointment:
        return JsonResponse({
            'success': False,
            'message': 'نوبت یافت نشد'
        })
    context = {
        'appointment': appointment
    }
    return JsonResponse({
        'detail_cancel': render_to_string('user_panel/include/detail_cancel.html', context, request=request)
    })

@require_POST
def cancel_appointment(request, appointment_id):

    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'درخواست نامعتبر است.'
        }, status=400)

    patient = request.user.patient_profile

    with transaction.atomic():

        appointment = Appointment.objects.select_for_update().select_related('available_slot').filter(id=appointment_id, patient=patient, status__in=['pending', 'confirmed'],).first()

        if not appointment:
            return JsonResponse({
                'success': False,
                'message': 'این نوبت قابل لغو نیست.'
            }, status=404)

        appointment.status = 'cancelled'
        appointment.save(update_fields=['status'])

        slot = appointment.available_slot
        slot.is_available = True
        slot.save(update_fields=['is_available'])

        patient = request.user.id
        today = timezone.localdate()

        appointments = Appointment.objects.filter(patient__user_id=patient,status__in=['pending', 'confirmed']).select_related('doctor__user','available_slot', ).prefetch_related('doctor__specialties', ).order_by('available_slot__date', 'available_slot__start_time')
        upcoming_appointments = Appointment.objects.filter(patient__user_id=patient,status__in=['pending', 'confirmed'],available_slot__date__gte=today).order_by('available_slot__date')
        past_appointments = Appointment.objects.filter(status='completed', patient__user_id=patient).order_by('available_slot__date','available_slot__start_time')
        cancelled_appointments = Appointment.objects.filter(status='cancelled', patient__user_id=patient).order_by('-available_slot__date', '-available_slot__start_time')

        context = {
            'appointments': appointments,
            'upcoming_appointments': upcoming_appointments,
            'past_appointments': past_appointments,
            'cancelled_appointments': cancelled_appointments,
        }

    return JsonResponse({
        'success': True,
        'message': 'نوبت با موفقیت لغو شد.',
        'list_appointment': render_to_string('user_panel/include/list_appointment.html', context, request=request)
    })

@login_required
@require_POST
def EditProfileUser(request):
    user_id = request.user.id
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({
            'success': False,
            'message': 'کاربر پیدا نشد'
        })
    profile_form = ProfileForm(request.POST, request.FILES, instance=user)
    if profile_form.is_valid():
        profile_form.save()
        profile_form = ProfileForm(instance=user)
        user = User.objects.get(id=request.user.id)
        context = {
            'profile_form': profile_form,
            'user': user
        }
        return JsonResponse({
            'success': True,
            'message': 'پروفایل با موفقیت ویرایش شد.',
            'profile_user': render_to_string('user_panel/include/profile_user_panel.html', context, request=request)
        })
    return JsonResponse({
        'success': False,
        'message': 'اطلاعات وارد شده معتبر نیست'
    })

@login_required
@require_POST
def set_favorite_doctor(request, pk):

    patient = request.user.patient_profile

    favorite_doctor = FavoriteDoctor.objects.filter(patient=patient, doctor_id=pk).first()
    if not favorite_doctor:
        add_favorite = FavoriteDoctor(patient=request.user.patient_profile, doctor_id=pk)
        add_favorite.save()
        return JsonResponse({
            'message': 'حذف از علاقه مندی'
        })
    else:
        favorite_doctor.delete()
        return JsonResponse({
            'message': 'افزودن به علاقه مندی'
        })

@login_required
@require_POST
def remove_favorite_doctor(request, pk):
    favorite_doctor = FavoriteDoctor.objects.filter(id=pk, patient__user=request.user).first()
    if not favorite_doctor:
        return JsonResponse({
            'message': 'علاقه مندی یافت نشد',
            'success': False
        })
    else:
        favorite_doctor.delete()
        favorite_doctors = FavoriteDoctor.objects.filter(patient__user=request.user).annotate(avg_rating=Avg('doctor__comments__rating')).select_related('doctor__user').prefetch_related('doctor__specialties')
        context = {
            'favorite_doctors': favorite_doctors
        }
        return JsonResponse({
            'favorite_list': render_to_string('user_panel/include/favorite.html', context, request=request),
            'message': 'علاقه مندی حذف شد',
            'success': True
        })

