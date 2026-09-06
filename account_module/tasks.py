from celery import shared_task

from .services.sms_service import send_sms


@shared_task
def send_sms_task(phone_number, message):
    return send_sms(phone_number, message)

