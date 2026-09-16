from django.db import models

# Create your models here.
from account_module.models import User


class Patient(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='patient_profile',
        verbose_name='کاربر'
    )

    image = models.ImageField(
        upload_to='images/patients/',
        blank=True,
        null=True,
        verbose_name='تصویر'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ عضویت'
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name='فعال / غیرفعال'
    )

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        verbose_name = 'بیمار'
        verbose_name_plural = 'بیماران'

class FavoriteDoctor(models.Model):
    patient = models.ForeignKey('patient.Patient',on_delete=models.CASCADE,related_name='favorite_doctors', verbose_name='بیمار')
    doctor = models.ForeignKey('doctors_module.Doctor',on_delete=models.CASCADE,related_name='favorited_by', verbose_name='دکتر')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')

    class Meta:
        verbose_name = 'علاقه مندی'
        verbose_name_plural = 'علاقه مندی ها'
        constraints = [
            models.UniqueConstraint(
                fields=['patient', 'doctor'],
                name='unique_patient_favorite_doctor'
            )
        ]
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.patient} - {self.doctor}'