from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class DoctorPanelView(TemplateView):
    template_name = 'doctor_panel/doctor_dashboard.html'
