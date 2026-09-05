from datetime import timedelta

from django.contrib.auth import login
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.views import View
from .forms import RegisterForm, OTPForm
# Create your views here.
from .models import User
import secrets
from .services.sms_service import send_sms

def generate_otp():
    return str(secrets.randbelow(90000)+ 10000)

class RegisterView(View):
    def get(self, request: HttpRequest):
        register_form = RegisterForm()
        context = {
            'register_form': register_form
        }
        return render(request, 'account_module/register.html', context)
    def post(self, request):
        register_form = RegisterForm(request.POST)

        if register_form.is_valid():
            phone_number = request.POST.get('phone_number')
            password = request.POST.get('password')

            user: User = User.objects.filter(phone_number=phone_number).exists()
            if user:
                register_form.add_error('phone_number', 'شماره وارد شده تکراری می باشد')
            else:
                new_user = User(phone_number=phone_number, is_active=False, verification_code_created_at=timezone.now(), verification_code=generate_otp())
                new_user.set_password(password)
                new_user.save()
                request.session['verification_user_id'] = new_user.id
                send_sms(
                    phone_number,
                    f"کد فعال سازی حساب کاربری مدیکر: {new_user.verification_code}"
                )
                return redirect(reverse('otp_verification_page'))
        context = {
            'register_form': register_form
        }
        return render(request, 'account_module/register.html', context)

class OTPVerification(View):

    def get(self, request):
        otp_code_form = OTPForm()

        user_id = request.session.get('verification_user_id')

        if not user_id:
            return redirect(reverse('register_page'))

        user = User.objects.filter(
            id=user_id,
            is_active=False
        ).first()

        if not user:
            request.session.pop('verification_user_id', None)
            return redirect(reverse('register_page'))

        context = {
            'otp_code_form': otp_code_form,
            'user': user,
        }

        return render(
            request,
            'account_module/otp_verification.html',
            context
        )

    def post(self, request: HttpRequest):

        user_id = request.session.get('verification_user_id')

        if not user_id:
            return redirect(reverse('register_page'))

        user = User.objects.filter(
            id=user_id,
            is_active=False
        ).first()

        if not user:
            request.session.pop('verification_user_id', None)
            return redirect(reverse('register_page'))

        otp_code_form = OTPForm(request.POST)

        if otp_code_form.is_valid():

            otp_code = otp_code_form.cleaned_data['otp_code']

            if user.verification_code == otp_code:

                otp_expired = (
                    timezone.now() >
                    user.verification_code_created_at +
                    timedelta(minutes=1, seconds=20)
                )

                if otp_expired:

                    otp_code_form.add_error(
                        'otp_code',
                        'کد فعال سازی منقضی شده است'
                    )

                else:

                    user.is_active = True
                    user.verification_code = None
                    user.verification_code_created_at = None

                    user.save(
                        update_fields=[
                            'is_active',
                            'verification_code',
                            'verification_code_created_at'
                        ]
                    )

                    request.session.pop(
                        'verification_user_id',
                        None
                    )

                    login(request, user)

                    return redirect(reverse('home'))

            else:

                otp_code_form.add_error(
                    'otp_code',
                    'کد وارد شده معتبر نیست'
                )

        context = {
            'otp_code_form': otp_code_form,
            'user': user,
        }

        return render(
            request,
            'account_module/otp_verification.html',
            context
        )
class ResendOTP(View):

    def post(self, request):

        user_id = request.session.get('verification_user_id')

        if not user_id:
            return JsonResponse({
                'success': False,
                'message': 'جلسه تایید منقضی شده است.'
            }, status=400)

        user = User.objects.filter(
            id=user_id,
            is_active=False
        ).first()

        if not user:
            return JsonResponse({
                'success': False,
                'message': 'کاربر پیدا نشد.'
            }, status=404)

        if user.verification_code_created_at:

            resend_available_at = (
                user.verification_code_created_at +
                timedelta(seconds=80)
            )

            if timezone.now() < resend_available_at:
                return JsonResponse({
                    'success': False,
                    'message': 'لطفاً کمی صبر کنید.'
                }, status=429)

        otp = generate_otp()



        user.verification_code = otp
        user.verification_code_created_at = timezone.now()

        user.save(
            update_fields=[
                'verification_code',
                'verification_code_created_at'
            ]
        )
        send_sms(
            user.phone_number,
            f"کد فعال سازی حساب کاربری مدیکر : {otp}"
        )
        return JsonResponse({
            'success': True,
            'message': 'کد تایید مجدداً ارسال شد.',
            'otp_created_at': user.verification_code_created_at.isoformat()
        })
class LoginView(View):
    def get(self, request):
        return render(request, 'account_module/login.html')


class ForgotPassword(View):
    def get(self, request):
        return render(request, 'account_module/forgot_password.html')
    
        
class ResetPasswordView(View):
    def get(self, request):
        return render(request, 'account_module/reset_password.html')
    


