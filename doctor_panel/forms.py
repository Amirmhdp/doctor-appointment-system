from django import forms

from account_module.models import User
from doctors_module.models import Doctor, Appointment


class WeeklyScheduleForm(forms.Form):

    WEEKDAY_CHOICES = [
        (0, 'شنبه'),
        (1, 'یکشنبه'),
        (2, 'دوشنبه'),
        (3, 'سه‌شنبه'),
        (4, 'چهارشنبه'),
        (5, 'پنجشنبه'),
        (6, 'جمعه'),
    ]

    DURATION_CHOICES = [
        (10, '10 دقیقه'),
        (15, '15 دقیقه'),
        (20, '20 دقیقه'),
        (30, '30 دقیقه'),
    ]

    weekday = forms.ChoiceField(
        choices=WEEKDAY_CHOICES,
        label='روز هفته',
        widget=forms.Select(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer',

        })
    )
    start_time = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full placeholder:text-custom-black text-sm  placeholder:text-sm px-3 py-2.5 border border-light-gray rounded-xl',
            'placeholder': 'ساعت شروع کار را وارد گنید'

        })
    )
    end_time = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full placeholder:text-custom-black text-sm  placeholder:text-sm px-3 py-2.5 border border-light-gray rounded-xl',
            'placeholder': 'ساعت پایان کار را وارد گنید'
        })
    )


    duration = forms.ChoiceField(
        choices=DURATION_CHOICES,
        label='مدت زمان هر ویزیت',
        widget=forms.Select(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer'
        })
    )

class editPeriodForm(forms.Form):

    DURATION_CHOICES = [
        (10, '10 دقیقه'),
        (15, '15 دقیقه'),
        (20, '20 دقیقه'),
        (30, '30 دقیقه'),
    ]

    edit_start_time = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400',
            'placeholder': 'ساعت شروع کار'

        })
    )
    edit_end_time = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400',
            'placeholder': 'ساعت پایان کار'
        })
    )


    edit_duration = forms.ChoiceField(
        choices=DURATION_CHOICES,
        label='مدت زمان هر ویزیت',
        widget=forms.Select(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer'
        })
    )

class ScheduleExceptionForm(forms.Form):



    DURATION_CHOICES = [
        (None, ''),
        (10, '10 دقیقه'),
        (15, '15 دقیقه'),
        (20, '20 دقیقه'),
        (30, '30 دقیقه'),
    ]

    date_hidden = forms.CharField(
        label='تاریخ',
        widget=forms.HiddenInput(attrs={

        })
    )
    exception_start_time = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400',
            'placeholder': 'ساعت شروع کار'

        })
    )
    exception_end_time = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400',
            'placeholder': 'ساعت پایان کار'
        })
    )

    duration = forms.ChoiceField(
        required=False,
        choices=DURATION_CHOICES,
        label='مدت زمان هر ویزیت',
        widget=forms.Select(attrs={
            'class': "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
        })
    )
    reason = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none',
            'placeholder': 'مثلا: مرخصی استعلاجی',
            'rows': 3

        })
    )

# class ProfileForm(forms.Form):
#
#
#      name = forms.CharField(
#         label='اسم',
#         widget=forms.TextInput(attrs={
#             'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray',
#         })
#         )
#      last_name = forms.CharField(
#         label='نام خانوادگی',
#         widget=forms.TextInput(attrs={
#             'class': '',
#         })
#         )
#      phone_number = forms.CharField(
#         label='نام خانوادگی',
#         widget=forms.TextInput(attrs={
#             'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray',
#         })
#         )
#      specialty = forms.ChoiceField(
#         label='نام خانوادگی',
#         widget=forms.Select(attrs={
#             'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray',
#         })
#         )
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
            })
        }

        labels = {
            'first_name': 'نام',
            'last_name': 'نام خانوادگی',
            'phone_number': 'شماره تلفن',
            'gender': 'جنسیت',
            'avatar': '',
        }


class DoctorForm(forms.ModelForm):

    class Meta:
        model = Doctor
        fields = ['specialties']

        widgets = {
            'specialties': forms.SelectMultiple(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400'
            }),
        }

        labels = {
            'specialties': 'تخصص',
        }

class AppointmentStatusForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['status']
