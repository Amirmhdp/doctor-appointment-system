from django.urls import path
from . import views 

urlpatterns = [
    path('doctor-panel', views.doctor_panel, name='doctor-panel'),
    path('edit-profile-doctor', views.EditProfile, name='edit_profile'),
    path('active-inactive-appointment-day/<pk>', views.active_inactive_appointment, name='active_inactive_appointment'),
    path('edite-period-appointment/<pk>', views.editPeriodWorking, name='edit_period'),
    path('exception-day', views.exception_day, name='exception_day'),
    path('delete-exception-day/<pk>', views.delete_exception_day, name='delete_exception_day'),
    path('appointment/<int:appointment_id>/',views.appointment_detail,name='appointment-detail'),
    path('appointment/<int:appointment_id>/update-status/',views.update_appointment_status,name='update-appointment-status'),
    path('detail-patient/<patient_id>', views.detail_patient, name='detail_patient')
]
