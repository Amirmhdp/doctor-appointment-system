from django.urls import path
from . import views
urlpatterns = [
    path('doctors-list', views.DoctorListView.as_view(), name='doctors_list_page'),
    path('doctor-profile', views.DoctorProfileView.as_view(), name='profile_page'),
]
