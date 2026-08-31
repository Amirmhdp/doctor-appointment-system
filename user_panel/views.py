from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class UserPanelView(TemplateView):
    template_name = 'user_panel/user_panel.html'