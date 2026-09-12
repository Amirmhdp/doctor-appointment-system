from django.contrib import admin
from . import models

# Register your models here.


admin.site.register(models.Doctor)
admin.site.register(models.Clinic)
admin.site.register(models.Specialty)
admin.site.register(models.WeeklySchedule)
admin.site.register(models.SchedulePeriod)
admin.site.register(models.ScheduleException)
admin.site.register(models.AvailableSlot)
admin.site.register(models.Appointment)
admin.site.register(models.Comment)
admin.site.register(models.Education)
admin.site.register(models.FAQ)
admin.site.register(models.Rule)
admin.site.register(models.Province)


