from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

# Create your models here.


class User(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'مرد'),
        ('female', 'زن'),
    ]
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
    password_reset_token = models.CharField(
        max_length=128,
        null=True,
        blank=True,
        verbose_name='کد فعال سازی فراموشی رمز عبور'
    )

    password_reset_token_created_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='تاریخ کد فعال سازی فراموشی رمز عبور'
    )
    birthday = models.DateField(null=True, blank=True, verbose_name="تاریخ تولد")
    avatar = models.ImageField(upload_to='images/avatar', null=True, blank=True, verbose_name='عکس کاربر')
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True, verbose_name='جنسیت')
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []
    def __str__(self):
        if self.get_full_name():
            return self.get_full_name()
        else:
            return 'کاربر مدیکر'

    class Meta:
        verbose_name = "کاربر"
        verbose_name_plural = "کاربران"
