from celery import shared_task
from .services.sms_service import send_sms
from datetime import datetime, timedelta
from django.utils import timezone
from doctors_module.models import Appointment


@shared_task
def send_sms_task(phone_number, message):
    return send_sms(phone_number, message)


@shared_task
def cancel_unconfirmed_appointments():
    timeout = timezone.now() - timedelta(minutes=10)

    appointments = Appointment.objects.filter(
        status='pending',
        created_at__lte=timeout
    ).select_related('available_slot')

    cancelled_count = 0

    for appointment in appointments:
        slot = appointment.available_slot

        appointment.status = 'cancelled'
        appointment.save(update_fields=['status'])

        slot_datetime = timezone.make_aware(
            datetime.combine(
                slot.date,
                slot.start_time
            )
        )

        if slot_datetime > timezone.now():
            slot.is_available = True
        else:
            slot.is_available = False

        slot.save(update_fields=['is_available'])

        cancelled_count += 1

    return f'{cancelled_count} appointments cancelled'
