from datetime import timedelta
from django.contrib.auth import login, logout
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from django.views import View
from .forms import RegisterForm, OTPForm, LoginForm, ForgotPasswordForm, ResetPasswordForm
from .models import User
import secrets
from .services.sms_service import send_sms
from .tasks import send_sms_task
# Create your views here.



def generate_otp():
    return str(secrets.randbelow(90000) + 10000)


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

            user = User.objects.filter(phone_number=phone_number).exists()
            if user:
                register_form.add_error('phone_number', 'شماره وارد شده تکراری می باشد')
            else:
                new_user = User(phone_number=phone_number, is_active=False, verification_code_created_at=timezone.now(),
                                verification_code=generate_otp(), username=phone_number)
                new_user.set_password(password)
                new_user.save()
                request.session['verification_user_id'] = new_user.id
                # send_sms_task.delay(
                #     phone_number,
                #     f"کد فعال سازی حساب کاربری مدیکر: {new_user.verification_code}"
                # )
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
        send_sms_task.delay(
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
        login_form = LoginForm()
        context = {
            'login_form': login_form
        }
        return render(request, 'account_module/login.html', context)

    def post(self, request: HttpRequest):
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            phone_number = login_form.cleaned_data['phone_number']
            user = User.objects.filter(phone_number=phone_number).first()
            if user is not None:
                if user.is_active:
                    password = login_form.cleaned_data['password']
                    check_password = user.check_password(password)
                    if check_password:
                        login(request, user)
                        remember_me = login_form.cleaned_data['remember_me']
                        if remember_me:
                            request.session.set_expiry(21 * 24 * 60 * 60)
                        return redirect(reverse('home'))
                    else:
                        login_form.add_error('password', 'رمز عبور اشتباه می باشد')
                else:
                    login_form.add_error('phone_number', 'حساب کاربری شما هنوز فعال نشده است')
            else:
                login_form.add_error('phone_number', 'برای ایجاد حساب کاربری ابتدا ثبت نام نمایید')
        context = {
            'login_form': login_form
        }
        return render(request, 'account_module/login.html', context)


class ForgotPassword(View):
    def get(self, request):
        forgot_password = ForgotPasswordForm()
        context = {
            'forgot_password': forgot_password
        }
        return render(request, 'account_module/forgot_password.html', context)

    def post(self, request):
        forgot_password = ForgotPasswordForm(request.POST)
        if forgot_password.is_valid():
            phone_number = forgot_password.cleaned_data['phone_number']
            user = User.objects.filter(phone_number=phone_number).first()
            if user is not None:
                if user.is_active:
                    user.password_reset_token = secrets.token_urlsafe(100)
                    user.password_reset_token_created_at = timezone.now()
                    user.save()
                    reset_url = request.build_absolute_uri(
                        reverse(
                            'reset_password_page',
                            args=[user.password_reset_token]
                        )
                    )
                    send_sms_task.delay(
                        phone_number,
                        f"برای تغییر رمز عبور روی لینک زیر کلیک کنید \n"
                        f"{reset_url}"
                    )
                else:
                    forgot_password.add_error('phone_number', 'حساب شما فعال نمی باشد')
            else:
                forgot_password.add_error('phone_number', 'کاربری با این شماره پیدا نشد')
        context = {
            'forgot_password': forgot_password
        }
        return render(request, 'account_module/forgot_password.html', context)


class ResetPasswordView(View):
    def get(self, request, token):
        reset_password_form = ResetPasswordForm()
        user = User.objects.filter(password_reset_token=token).first()
        if not user:
            return redirect(reverse('forgot_password_page'))
        expire_token = (
                user.password_reset_token_created_at + timedelta(minutes=5) > timezone.now()
        )
        if not expire_token:
            return redirect(reverse('forgot_password_page'))
        context = {
            'reset_password_form': reset_password_form
        }
        return render(request, 'account_module/reset_password.html', context)

    def post(self, request, token):
        reset_password_form = ResetPasswordForm(request.POST)

        if reset_password_form.is_valid():
            password = reset_password_form.cleaned_data['password']
            user = User.objects.filter(is_active=True, password_reset_token=token).first()
            if user:
                expire_token = (
                        user.password_reset_token_created_at + timedelta(minutes=5) > timezone.now()
                )
                if not expire_token:
                    return redirect(reverse('forgot_password_page'))
                else:
                    user.set_password(password)
                    user.password_reset_token = None
                    user.password_reset_token_created_at = None
                    user.save()
                    return redirect(reverse('login_page'))
            else:
                return redirect(reverse('forgot_password_page'))

        context = {
            'reset_password_form': reset_password_form
        }
        return render(request, 'account_module/reset_password.html', context)

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect(reverse('home'))
