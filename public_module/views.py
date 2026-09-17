from django.http import HttpRequest
from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
from public_module.models import SettingsModel


def about_us(request:HttpRequest):
    site_setting = SettingsModel.objects.filter(is_active=True)[:1]
    context = {
        'site_setting': site_setting
    }
    return render(request, 'public_module/about_us.html', context)

    
    
class ContactUsView(TemplateView):
    template_name = 'public_module/contact_us.html'
    
class FaqView(TemplateView):
    template_name = 'public_module/faq.html'
    
class TermsAndConditionsView(TemplateView):
    template_name = 'public_module/terms_and_conditions.html'
