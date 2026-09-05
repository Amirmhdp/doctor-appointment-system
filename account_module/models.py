from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

# Create your models here.


class User(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'مرد'),
        ('female', 'زن'),
    ]
    name = models.CharField(max_length=50, verbose_name='نام')
    family = models.CharField(max_length=50, verbose_name='نام خانوداگی')
    national_code = models.CharField(max_length=10, unique=True, null=True, blank=True, verbose_name="کد ملی")
    phone_number = models.CharField(
        max_length=11,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ],
        verbose_name="شماره موبایل"
    )
    verification_code = models.CharField(
        max_length=6,
        null=True,
        blank=True,
        verbose_name="کد تأیید"
    )
    verification_code_created_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="تاریخ ارسال کد فعال سازی"
    )
    birthday = models.DateField(null=True, blank=True, verbose_name="تاریخ تولد")
    avatar = models.ImageField(upload_to='images/avatar', null=True, blank=True, verbose_name='عکس کاربر')
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True, verbose_name='جنسیت')


