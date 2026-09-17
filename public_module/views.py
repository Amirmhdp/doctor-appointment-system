from django.http import HttpRequest, JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
from doctors_module.models import FAQ, Rule
from public_module.forms import ContactUsForm
from public_module.models import SettingsModel


def about_us(request:HttpRequest):
    site_setting = SettingsModel.objects.filter(is_active=True)[:1]
    context = {
        'site_setting': site_setting
    }
    return render(request, 'public_module/about_us.html', context)

    
def contact_us(request: HttpRequest):
    site_setting = SettingsModel.objects.filter(is_active=True)[:1]
    if request.method == 'POST':
        contact_us_form = ContactUsForm(request.POST)
        if contact_us_form.is_valid():
            contact_us_form.save()
            return JsonResponse({
                'success': True,
                'message': 'پیام با موفقیت ارسال شد'
            })
        else:
            return JsonResponse({
                'success': False,
                'message': 'اطلاعات وارد شده صحیح نیست'
            })
    contact_us_form = ContactUsForm()
    context = {
        'site_setting': site_setting,
        'contact_us_form': contact_us_form
    }
    return render(request, 'public_module/contact_us.html', context)
    
def faq(request):
    faq_users = FAQ.objects.filter(user_type='citizen', is_active=True)
    faq_doctors = FAQ.objects.filter(user_type='doctor', is_active=True)
    context = {
        'faq_doctors': faq_doctors,
        'faq_users': faq_users,
    }
    return render(request, 'public_module/faq.html', context)
    
def terms_and_conditions(request):
    terms = Rule.objects.filter(is_active=True)
    context = {
        'terms': terms
    }
    return render(request, 'public_module/terms_and_conditions.html', context)
