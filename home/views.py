from django.shortcuts import render

# Create your views here.


# header render partial
from django.views.generic import TemplateView


def header_component(request):
    return render(request, 'shared/header.html')

def footer_component(request):
    return render(request, 'shared/footer.html')


class Home(TemplateView):
    template_name = 'home/home.html'


