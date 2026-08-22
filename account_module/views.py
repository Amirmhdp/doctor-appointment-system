from django.shortcuts import render
from django.views import View
# Create your views here.

class RegisterView(View):
    def get(self, request):
        return render(request, 'account_module/register.html')


class LoginView(View):
    def get(self, request):
        return render(request, 'account_module/login.html')


class ForgotPassword(View):
    def get(self, request):
        return render(request, 'account_module/forgot_password.html')
    
        
class ResetPasswordView(View):
    def get(self, request):
        return render(request, 'account_module/reset_password.html')

