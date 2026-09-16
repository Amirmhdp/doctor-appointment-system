from django import forms

from account_module.models import User


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'gender', 'avatar']

        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray'
            }),
            'phone_number': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray'
            }),
            'gender': forms.RadioSelect(attrs={
                'class': 'ml-3'
            }),
            'avatar': forms.FileInput(attrs={
                'class': 'hidden'
            }),

        }

        labels = {
            'first_name': 'نام',
            'last_name': 'نام خانوادگی',
            'phone_number': 'شماره تلفن',
            'gender': 'جنسیت',
            'avatar': '',
        }
