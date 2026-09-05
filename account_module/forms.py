from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


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