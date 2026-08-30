from django.urls import path
from . import views 

urlpatterns = [
    path('doctor-panel', views.DoctorPanelView.as_view(), name='doctor-panel'),
]
