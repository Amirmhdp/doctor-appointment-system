from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import transaction
from django.db.models import Value, Avg
from django.db.models.functions import Concat
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string

from doctors_module.forms import CommentForm
from doctors_module.models import Doctor, Specialty, Comment, FAQ, AvailableSlot, Appointment


# Create your views here.
from doctors_module.service import book_appointment, SlotNotAvailableError
from patient.models import Patient


def doctor_list(request):
    doctors = Doctor.objects.filter(
        is_active=True
    ).select_related(
        'user'
    ).prefetch_related(
        'specialties'
    )
    specialties = Specialty.objects.filter(is_active=True)
    doctor = request.GET.get('doctor')
    specialty = request.GET.get('specialty')
    city = request.GET.get('city')
    if doctor:
        doctors = doctors.annotate(
            full_name=Concat(
                'user__first_name',
                Value(' '),
                'user__last_name'
            )
        ).filter(
            full_name__icontains=doctor
        )
    if specialty:
        doctors = doctors.filter(specialties__name__iexact=specialty)
    # if city:
    #     doctors = doctors.filter(city=city)
    context = {
        'doctors': doctors,
        'specialties': specialties
    }
    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return render(request, 'doctors_module/include/doctors.html', context)
    return render(request, 'doctors_module/doctors_list_page.html', context)


def detail_doctor(request, url_title):
    doctor = get_object_or_404(
        Doctor.objects.prefetch_related('clinics', 'specialties'),
        is_active=True,
        url_title=url_title,
    )
    available_slots = AvailableSlot.objects.filter(
        doctor=doctor,
        is_available=True
    ).order_by(
        'date',
        'start_time'
    )
    comments_queryset = Comment.objects.filter(is_active=True, doctor_id=doctor.id, parent=None).select_related('user').order_by('-created_at')
    faqs = FAQ.objects.filter(is_active=True, specialties__in=doctor.specialties.all())
    is_doctor = hasattr(request.user, 'doctor_profile')

    if request.method == "POST":

        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            print('valid')
            if is_doctor or request.user.is_superuser:
                print('is superuser or doctor')
                comment_parent = comment_form.cleaned_data['comment_parent']
                if comment_parent:
                    print('creating reply!!!!')
                    Comment.objects.create(
                        parent_id=int(comment_form.cleaned_data['comment_parent']),
                        user=request.user,
                        doctor=doctor,
                        text=comment_form.cleaned_data['text'],
                        is_active=True
                    )
                    comment_form = CommentForm()
                else:
                    print('والد پیدا نشد')
                    print('ثبت کامنت برای پزشک یا ادمین')
                    Comment.objects.create(
                        parent_id=None,
                        user=request.user,
                        doctor=doctor,
                        text=comment_form.cleaned_data['text'],
                        is_active=True
                    )
                    comment_form = CommentForm()
            else:
                print("update or create a new comment for normal user")
                print(comment_form.cleaned_data['is_like'])
                comment, created = Comment.objects.update_or_create(
                    user=request.user,
                    doctor=doctor,
                    parent=None,
                    defaults={
                        'rating': comment_form.cleaned_data['rating'],
                        'text': comment_form.cleaned_data['text'],
                        'is_like': comment_form.cleaned_data['is_like'],
                        'is_active': True,
                    }
                )
                comment_form = CommentForm()
    else:
        comment_form = CommentForm()
    comments_count = Comment.objects.filter(is_active=True, doctor_id=doctor.id, parent=None).count()
    avg_rating = comments_queryset.aggregate(avg=Avg('rating'))['avg'] or 0
    paginator = Paginator(comments_queryset, 5)
    page_number = request.GET.get('page', 1)
    comments = paginator.get_page(page_number)
    context = {
        'doctor': doctor,
        'comments': comments,
        'faqs': faqs,
        'comment_form': comment_form,
        'comments_count': comments_count,
        'avg_rating': avg_rating,
        'available_slots': available_slots,
        'is_doctor': is_doctor
    }
    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return JsonResponse({
            'comments_html': render_to_string('doctors_module/include/comment.html', context, request=request),
            'count_comment': render_to_string('doctors_module/include/count_comment.html', context, request=request),
            'navigation': render_to_string('doctors_module/include/navigation.html', context, request),
            'rating': render_to_string('doctors_module/include/rating.html', context, request),
            'has_next': comments.has_next(),
            'next_page': comments.next_page_number() if comments.has_next() else None,
        })
    return render(request, 'doctors_module/doctor_profile.html', context)


@login_required
def book_appointment_view(request):

    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'درخواست نامعتبر است.'
        }, status=400)

    # فقط بیمار می‌تواند نوبت رزرو کند
    try:
        patient = request.user.patient_profile
    except Patient.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'پروفایل بیمار پیدا نشد.'
        }, status=403)

    slot_id = request.POST.get('slot_id')

    if not slot_id:
        return JsonResponse({
            'success': False,
            'message': 'زمان نوبت مشخص نشده است.'
        }, status=400)

    try:
        appointment = book_appointment(
            patient=patient,
            slot_id=slot_id
        )

    except SlotNotAvailableError as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=409)
    return JsonResponse({
        'success': True,
        'message': 'نوبت شما با موفقیت ثبت شد.',
        'appointment_id': appointment.id,
        'status': appointment.status,
    })

