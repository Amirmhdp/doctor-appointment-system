from django.urls import path
from . import views

urlpatterns = [
    path('user-panel', views.user_panel, name='user_panel_page'),
    path('cancel/<int:appointment_id>/', views.cancel_appointment, name='cancel_appointment'),
    path('show-canceld-detail/<pk>', views.show_canceled, name='show_cancel_detail'),
    path('delete-appointment/<appointment_id>', views.cancel_appointment, name='show_cancel_detail'),

]
