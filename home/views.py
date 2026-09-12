from django.shortcuts import render

# Create your views here.


# header render partial
from django.views.generic import TemplateView

from doctors_module.models import Specialty, Doctor


def header_component(request):
    return render(request, 'shared/header.html')

def footer_component(request):
    return render(request, 'shared/footer.html')


class Home(TemplateView):
    template_name = 'home/home.html'

    def get_context_data(self, **kwargs):
        context = super(Home, self).get_context_data()
        specialties = Specialty.objects.filter(is_active=True)
        doctors = Doctor.objects.filter(is_active=True)[:12]
        context['specialties'] = specialties
        context['doctors'] = doctors
        return context


