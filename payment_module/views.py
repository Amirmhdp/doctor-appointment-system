from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.utils import timezone
from doctors_module.models import AvailableSlot, Appointment
from doctors_module.service import SlotNotAvailableError, book_appointment
from patient.models import Patient
from payment_module.models import Payment
from payment_module.zarinpal import ZarinPal


@login_required
def payment_view(request, slot_id):

    slot = get_object_or_404(
        AvailableSlot.objects.select_related(
            'doctor__user'
        ).prefetch_related(
            'doctor__specialties'
        ),
        id=slot_id,
        is_available=True
    )

    try:
        patient = request.user.patient_profile
    except Patient.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'پروفایل بیمار پیدا نشد.'
        }, status=403)

    # price of visit
    visit_price = 100000

    # get tax
    tax = visit_price * 10 // 100

    # final price (toman)
    total_price = visit_price + tax

    context = {
        'slot': slot,
        'patient': patient,
        'visit_price': visit_price,
        'tax': tax,
        'total_price': total_price,
    }

    return render(
        request,
        'payment_module/payment_page.html',
        context
    )

@login_required
def start_payment(request, slot_id):

    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'درخواست نامعتبر است.'
        }, status=400)

    slot = get_object_or_404(
        AvailableSlot.objects.select_related(
            'doctor__user'
        ),
        id=slot_id,
        is_available=True
    )

    try:
        patient = request.user.patient_profile
    except Patient.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'پروفایل بیمار پیدا نشد.'
        }, status=403)

    # مبلغ ویزیت به تومان
    visit_price = 100000

    # مالیات ۱۰ درصد
    tax = visit_price * 10 // 100

    # مبلغ نهایی به تومان
    total_price = visit_price + tax

    # تبدیل تومان به ریال
    amount = total_price * 10

    payment = Payment.objects.create(
        patient=patient,
        slot=slot,
        amount=amount,
        status='pending'
    )

    callback_url = request.build_absolute_uri(
        reverse('payment_callback')
    )

    zarinpal = ZarinPal(
        merchant=settings.ZARINPAL_MERCHANT_ID,
        callback_url=callback_url,
        sandbox=settings.ZARINPAL_SANDBOX,
    )

    result = zarinpal.send_request(
        amount=amount,
        description=(
            f'پرداخت نوبت پزشک '
            f'{slot.doctor.user.get_full_name()}'
        ),
        mobile=patient.user.phone_number,
    )

    if not result['success']:

        payment.status = 'failed'
        payment.save(update_fields=['status'])

        return JsonResponse({
            'success': False,
            'message': result.get(
                'message',
                'خطا در ایجاد تراکنش پرداخت.'
            ),
            'error_code': result.get('error_code'),
        }, status=400)

    payment.authority = result['authority']
    payment.save(update_fields=['authority'])

    return JsonResponse({
        'success': True,
        'payment_url': result['url']
    })

def payment_callback(request):

    authority = request.GET.get('Authority')
    status = request.GET.get('Status')


    if not authority:
        return JsonResponse({
            'success': False,
            'message': 'شناسه تراکنش پیدا نشد.'
        }, status=400)


    if status != 'OK':

        payment = Payment.objects.filter(authority=authority).first()

        if payment:
            payment.status = 'failed'
            payment.save(update_fields=['status'])
            context = {
                'payment': payment,
            }
            return render(request, 'payment_module/payment_failed.html', context)

        return JsonResponse({
            'success': False,
            'message': 'تراکنش پیدا نشد.'
        }, status=404)

    try:
        payment = Payment.objects.select_related('patient', 'slot', 'slot__doctor__user').get(authority=authority)

    except Payment.DoesNotExist:
        return JsonResponse({
            'success': False,
            'message': 'تراکنش پیدا نشد.'
        }, status=404)

    if payment.status == 'success':
        return JsonResponse({
            'success': True,
            'message': 'این تراکنش قبلاً با موفقیت تأیید شده است.',
            'payment_id': payment.id,
            'ref_id': payment.ref_id,
        })

    zarinpal = ZarinPal(
        merchant=settings.ZARINPAL_MERCHANT_ID,
        callback_url=request.build_absolute_uri(
            '/payment/callback/'
        ),
        sandbox=settings.ZARINPAL_SANDBOX,
    )

    result = zarinpal.verify(
        amount=payment.amount,
        authority=authority
    )

    if not result['success']:

        payment.status = 'failed'
        payment.save(update_fields=['status'])

        return JsonResponse({
            'success': False,
            'message': result.get(
                'message',
                'پرداخت تأیید نشد.'
            ),
            'error_code': result.get('error_code'),
        }, status=400)

    try:

        with transaction.atomic():

            payment = Payment.objects.select_for_update().get(
                id=payment.id
            )

            if payment.status == 'success':
                return redirect(
                    'payment_success',
                    payment_id=payment.id
                )

            payment.status = 'success'

            payment.ref_id = result.get('ref_id')

            payment.paid_at = timezone.now()

            payment.save(update_fields=['status', 'ref_id', 'paid_at',])

            appointment = book_appointment(patient=payment.patient, slot_id=payment.slot_id)

    except SlotNotAvailableError:

        return JsonResponse({
            'success': False,
            'message': (
                'پرداخت با موفقیت انجام شد، '
                'اما این زمان دیگر قابل رزرو نیست.'
            ),
            'payment_id': payment.id,
        }, status=409)

    if payment.status == 'success':
        return redirect('payment_success',payment_id=payment.id)

@login_required
def payment_success(request, payment_id):

    payment = get_object_or_404(
        Payment.objects.select_related('slot__doctor__user','patient'), id=payment_id, patient=request.user.patient_profile, status='success')

    appointment = get_object_or_404(
        Appointment.objects.select_related('doctor__user','available_slot'),patient=payment.patient,available_slot=payment.slot,)

    context = {
        'payment': payment,
        'appointment': appointment,
    }

    return render(request,'payment_module/payment_success.html',context)
