from django import forms


class CommentForm(forms.Form):
    is_like = forms.BooleanField(
        required=False,
        widget=forms.HiddenInput(attrs={
            'name': 'is-like',
            'id': 'is-like',
            'required': 'required',
            'value': 'True'
        })
    )

    rating = forms.IntegerField(
        required=False,
        widget=forms.HiddenInput(attrs={
            'name': 'rating',
            'id': 'rating-input',
            'required': 'required'

        })
    )

    text = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'rows': 6,
            'required': 'required',
            'placeholder': 'اینجا بنویسید....',
            'class': 'border border-light-gray p-2.5 text-sm text-custom-black w-full placeholder:text-sm placeholder:text-slate-gray rounded-lg outline-none focus:border-primary-special transition-all ease-in-out duration-300'
        })
    )
    comment_parent = forms.CharField(
        required=False,
        widget=forms.HiddenInput()
    )

    # def clean(self):
    #     cleaned_data = super().clean()
    #     if self.data.get('is_like', '') == '':
    #         self.add_error(None, 'لطفاً پیشنهاد یا عدم پیشنهاد را انتخاب کنید')
    #     return cleaned_data




