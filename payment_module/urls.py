from django.urls import path
from . import views


urlpatterns = [
    path(
        'payment/<int:slot_id>/',
        views.payment_view,
        name='payment'
    ),

    path(
        'payment/start/<int:slot_id>/',
        views.start_payment,
        name='start_payment'
    ),

    path(
        'payment/callback/',
        views.payment_callback,
        name='payment_callback'
    ),
    path(
        'payment/success/<int:payment_id>/',
        views.payment_success,
        name='payment_success'
    ),
]