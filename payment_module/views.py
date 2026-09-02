from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class PaymentView(TemplateView):
    template_name = 'payment_module/payment_page.html'