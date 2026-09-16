from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.utils import timezone
from django.views.decorators.http import require_POST

from doctors_module.models import Appointment


@login_required
def user_panel(request):

    patient = request.user.id
    today = timezone.localdate()

    appointments = Appointment.objects.filter(patient__user_id=patient,status__in=['pending', 'confirmed']).select_related('doctor__user','available_slot', ).prefetch_related('doctor__specialties', ).order_by('available_slot__date', 'available_slot__start_time')

    upcoming_appointments = appointments.filter(status__in=['pending', 'confirmed'],available_slot__date__gte=today).order_by('available_slot__date', 'available_slot__start_time')
    past_appointments = Appointment.objects.filter(status='completed',patient__user_id=patient).order_by('available_slot__date', 'available_slot__start_time')
    cancelled_appointments = Appointment.objects.filter(status='cancelled', patient__user_id=patient).order_by('-available_slot__date', '-available_slot__start_time')

    context = {
        'appointments': appointments,
        'upcoming_appointments': upcoming_appointments,
        'past_appointments': past_appointments,
        'cancelled_appointments': cancelled_appointments,
    }

    return render(request,'user_panel/user_panel.html',context)



@require_POST
def show_canceled(request, pk):

    appointment = Appointment.objects.filter(id=pk, available_slot__is_available=False).first()

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

@login_required
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
