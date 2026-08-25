from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic import TemplateView
# Create your views here.


class DoctorListView(TemplateView):
    template_name = 'doctors_module/doctors_list_page.html'
