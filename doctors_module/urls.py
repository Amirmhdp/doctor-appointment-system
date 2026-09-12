from django.urls import path
from . import views
urlpatterns = [
    path('doctors-list', views.doctor_list, name='doctors_list_page'),
    path('doctor-profile/<url_title>', views.detail_doctor, name='profile_page'),
    path('book-appointment/',views.book_appointment_view,name='book-appointment'),
]
