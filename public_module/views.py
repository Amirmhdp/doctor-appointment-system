from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class AboutUsView(TemplateView):
    template_name = 'public_module/about_us.html'
