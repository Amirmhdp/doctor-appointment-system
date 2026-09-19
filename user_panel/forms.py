from django import forms

from account_module.models import User


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'gender', 'avatar', 'national_code']

        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'نام خود را وارد کنید',
            }),

            'last_name': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'نام خانوادگی خود را وارد کنید',
            }),
            'national_code': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'کد خود را وارد کنید',
            }),

            'phone_number': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'مثلاً 09123456789',
                'inputmode': 'numeric',
            }),

            'gender': forms.RadioSelect(attrs={
                'class': 'ml-3',
            }),

            'avatar': forms.FileInput(attrs={
                'class': 'hidden',
            }),
        }

        labels = {
            'first_name': 'نام',
            'last_name': 'نام خانوادگی',
            'phone_number': 'شماره تلفن',
            'gender': 'جنسیت',
            'avatar': '',
        }
