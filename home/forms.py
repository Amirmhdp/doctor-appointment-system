from django import forms


class LiveSearchForm(forms.Form):
    search = forms.CharField(
        max_length=100,
        required=False,
        min_length=3,
        widget=forms.TextInput(attrs={
            'class': 'text-slate-gray text-sm placeholder:text-sm placeholder:text-medium-gray border-none outline-none w-full',
            'placeholder': 'نام بیماری، تخصص، پزشک و...'
        })
    )