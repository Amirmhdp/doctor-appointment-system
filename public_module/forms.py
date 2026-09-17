from django import forms

from public_module.models import ContactUs


class ContactUsForm(forms.ModelForm):
    class Meta:
        model = ContactUs
        fields = ['name', 'last_name', 'phone_number', 'title_message', 'message']

        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full outline-none border border-low-gray rounded-lg pr-10 pl-4 py-3 text-sm text-slate-gray placeholder:text-slate-gray focus:border-primary-special focus:ring-2 focus:ring-blue-50 transition-all duration-300',
                'placeholder': 'نام خود را وارد کنید'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'w-full outline-none border border-low-gray rounded-lg pr-10 pl-4 py-3 text-sm text-slate-gray placeholder:text-slate-gray focus:border-primary-special focus:ring-2 focus:ring-blue-50 transition-all duration-300',
                'placeholder': 'نام خانوادگی خود را وارد کنید'

            }),
            'phone_number': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'شماره تلفن همراه خود را وارد کنید'

            }),
            'title_message': forms.TextInput(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'موضوع پیام را وارد کنید'
            }),
            'message': forms.Textarea(attrs={
                'class': 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 placeholder:text-sm placeholder:text-slate-gray text-sm text-slate-gray transition-all duration-300 ease-in-out',
                'placeholder': 'پیام خود را بنویسید...',
                'rows': 6
            }),


        }
        error_messages = {
            'name': {
                'required': 'لطفاً نام خود را وارد کنید.',
            },
            'last_name': {
                'required': 'لطفاً نام خانوادگی خود را وارد کنید.',
            },
            'phone_number': {
                'required': 'لطفاً شماره تلفن همراه خود را وارد کنید.',
                'invalid': 'شماره تلفن همراه وارد شده صحیح نیست.',
            },
            'title_message': {
                'required': 'لطفاً موضوع پیام را وارد کنید.',
            },
            'message': {
                'required': 'لطفاً متن پیام را وارد کنید.',
            },
        }

        labels = {
            'name': 'نام',
            'last_name': 'نام خانوادگی',
            'phone_number': 'شماره تلفن',
            'title_message': 'موضوع پیام',
            'message': 'پیام شما',
        }
