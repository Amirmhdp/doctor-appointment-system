from kavenegar import KavenegarAPI
from kavenegar import APIException, HTTPException

from django.conf import settings


def send_sms(phone_number, message):
    try:
        api = KavenegarAPI(settings.KAVENEGAR_API_KEY)

        response = api.sms_send({
            "receptor": phone_number,
            "sender": settings.KAVENEGAR_SENDER,
            "message": message,
        })

        return response

    except APIException as e:
        print(f"Kavenegar API Error: {e}")
        return None

    except HTTPException as e:
        print(f"Kavenegar HTTP Error: {e}")
        return None