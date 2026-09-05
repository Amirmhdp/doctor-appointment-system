from django.urls import path
from . import views

urlpatterns = [
    path('register', views.RegisterView.as_view(), name='register_page'),
    path('login', views.LoginView.as_view(), name='login_page'),
    path('forgot-password', views.ForgotPassword.as_view(), name='forgot_password_page'),
    path('reset-password', views.ResetPasswordView.as_view(), name='reset_password_page'),
    path('otp-verification', views.OTPVerification.as_view(), name='otp_verification_page'),
    path('resend-otp/', views.ResendOTP.as_view(), name='resend_otp'),
]
