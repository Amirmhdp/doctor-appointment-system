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