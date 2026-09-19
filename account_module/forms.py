from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from doctors_module.models import Doctor
from doctors_module.models import Clinic

class RegisterForm(forms.Form):
    phone_number = forms.CharField(
        max_length=11,
        label='شماره تلفن',
        widget=forms.TextInput(attrs={
            'class': 'w-full focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'text',
            'name': 'phone-number',
            'required': 'required',
            'id': 'email-or-number',
        }),
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ],
        error_messages={
            'required': 'لطفا شماره تلفن خود را تکمیل نمایید'
        }
    )
    password = forms.CharField(
        label='رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'w-full password-input focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'password',
            'name': 'password',
            'required': 'required',
            'id': 'password-input'
        }

        )
    )
    confirm_password = forms.CharField(
        label='تکرار رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'w-full password-input focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'password',
            'name': 'confirm_password',
            'required': 'required',
            'id': 'confirm-password'
        }
        )
    )

    def clean_confirm_password(self):
        password = self.cleaned_data.get('password')
        confirm_password = self.cleaned_data.get('confirm_password')

        if password == confirm_password:
            return confirm_password
        else:
            raise ValidationError('کلمه عبور و تکرار کلمه عبور مغایرت دارند')


class OTPForm(forms.Form):
    otp_code = forms.CharField(
        max_length=5,
        min_length=5,
        required=True,
        widget=forms.HiddenInput()
    )

    def clean_otp_code(self):
        otp_code = self.cleaned_data.get('otp_code')
        if not otp_code.isdigit():
            raise forms.ValidationError("کد تایید باید فقط شامل اعداد باشد.")
        return otp_code


class LoginForm(forms.Form):
    phone_number = forms.CharField(
        max_length=11,
        label='شماره تلفن',
        widget=forms.TextInput(attrs={
            'class': 'w-full focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'text',
            'name': 'phone-number',
            'required': 'required',
            'id': 'email-or-number',
        }),
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ],
    )
    password = forms.CharField(
        label='رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'w-full password-input focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'password',
            'name': 'password',
            'required': 'required',
            'id': 'password-input'
        }
        )
    )
    remember_me = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'cursor-pointer',
            "id": 'remember-me'
        })
    )

class ForgotPasswordForm(forms.Form):
    phone_number = forms.CharField(
        max_length=11,
        label='شماره تلفن',
        widget=forms.TextInput(attrs={
            'class': 'w-full focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'text',
            'name': 'phone-number',
            'required': 'required',
            'id': 'email-or-number',
        }),
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ],
    )


class ResetPasswordForm(forms.Form):
    password = forms.CharField(
        label='رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'w-full password-input focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'password',
            'name': 'password',
            'required': 'required',
            'id': 'password-input'
        }

        )
    )
    confirm_password = forms.CharField(
        label='تکرار رمز عبور',
        widget=forms.PasswordInput(attrs={
            'class': 'w-full password-input focus:outline-none focus:ring-0 outline-none h-full mt-0.75 border-none text-slate-gray text-sm placeholder:text-sm placeholder:text-gray-400 placeholder:font-bold',
            'type': 'password',
            'name': 'confirm_password',
            'required': 'required',
            'id': 'confirm-password'
        }
        )
    )

    def clean_confirm_password(self):
        password = self.cleaned_data.get('password')
        confirm_password = self.cleaned_data.get('confirm_password')

        if password == confirm_password:
            return confirm_password
        else:
            raise ValidationError('کلمه عبور و تکرار کلمه عبور مغایرت دارند')



class DoctorRegister(forms.ModelForm):

    class Meta:

        model = Doctor

        fields = [
            'medical_code',
            'gender',
            'specialties',
            'bio',
            'years_of_experience',
            'image',
        ]

        widgets = {
            'medical_code': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'کد نظام پزشکی خود را وارد کنید',
            }),

            'gender': forms.Select(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
            }),

            'specialties': forms.SelectMultiple(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
            }),

            'bio': forms.Textarea(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'rows': 5,
                'placeholder': 'توضیح کوتاهی درباره خود و تخصصتان وارد کنید',
            }),

            'years_of_experience': forms.NumberInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'تعداد سال سابقه کار خود را وارد کنید',
                'min': 0,
            }),

            'image': forms.ClearableFileInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'accept': 'image/*',
            }),
        }


class ClinicForm(forms.ModelForm):

    class Meta:

        model = Clinic

        fields = [
            'province',
            'name',
            'address',
            'email',
            'phone_number',
        ]

        widgets = {
            'province': forms.Select(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
            }),

            'name': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'نام مطب یا کلینیک را وارد کنید',
            }),

            'address': forms.Textarea(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'rows': 4,
                'placeholder': 'آدرس کامل مطب یا کلینیک را وارد کنید',
            }),

            'email': forms.EmailInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'ایمیل مطب یا کلینیک را وارد کنید',
            }),

            'phone_number': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'شماره تماس مطب یا کلینیک را وارد کنید',
            }),
        }


