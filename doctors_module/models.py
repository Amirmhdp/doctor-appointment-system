from django.core.validators import RegexValidator
from django.db import models

# Create your models here.
from account_module.models import User
from patient.models import Patient


class Specialty(models.Model):
    name = models.CharField(max_length=60, verbose_name='نام')
    image = models.ImageField(upload_to='images/specialty', verbose_name='تصویر')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    is_active = models.BooleanField(default=True, verbose_name='فعال / غیرفعال')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'تخصص'
        verbose_name_plural = 'تخصص ها'


from django.db import models
from django.conf import settings


class Doctor(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_profile',
        verbose_name='کاربر'
    )

    specialties = models.ManyToManyField(
        'Specialty',
        related_name='doctors',
        verbose_name='تخصص‌ها'
    )

    medical_code = models.CharField(
        max_length=20,
        unique=True,
        verbose_name='شماره نظام پزشکی'
    )

    bio = models.TextField(
        blank=True,
        verbose_name='درباره پزشک'
    )

    years_of_experience = models.PositiveIntegerField(
        default=0,
        verbose_name='سابقه کار'
    )

    image = models.ImageField(
        upload_to='images/doctors/',
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
        verbose_name = 'پزشک'
        verbose_name_plural = 'پزشکان'


class Clinic(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='clinics',
        verbose_name='پزشک'
    )
    name = models.CharField(
        max_length=100,
        verbose_name='نام مطب'
    )
    address = models.TextField(
        verbose_name='آدرس'
    )
    email = models.TextField(
        null=True,
        blank=True,
        verbose_name='ایمیل',
    )
    phone_number = models.CharField(
        max_length=11,
        verbose_name='شماره تماس',
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ]
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'مطب'
        verbose_name_plural = 'مطب‌ها'


class AvailableSlot(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='available_slots',
        verbose_name='پزشک'
    )

    date = models.DateField(
        verbose_name='تاریخ'
    )

    start_time = models.TimeField(
        verbose_name='ساعت شروع'
    )

    end_time = models.TimeField(
        verbose_name='ساعت پایان'
    )

    is_available = models.BooleanField(
        default=True,
        verbose_name='در دسترس'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )

    def __str__(self):
        return f'{self.doctor} - {self.date} - {self.start_time}'

    class Meta:
        verbose_name = 'زمان در دسترس'
        verbose_name_plural = 'زمان‌های در دسترس'


class Appointment(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.PROTECT,
        related_name='appointments',
        verbose_name='پزشک'
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.PROTECT,
        related_name='appointments',
        verbose_name='بیمار'
    )

    available_slot = models.OneToOneField(
        AvailableSlot,
        on_delete=models.PROTECT,
        related_name='appointment',
        verbose_name='زمان نوبت'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ثبت نوبت'
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'در انتظار'),
            ('confirmed', 'تأیید شده'),
            ('completed', 'انجام شده'),
            ('cancelled', 'لغو شده'),
        ],
        default='pending',
        verbose_name='وضعیت'
    )

    def __str__(self):
        return f'{self.patient} - {self.doctor}'

    class Meta:
        verbose_name = 'نوبت'
        verbose_name_plural = 'نوبت‌ها'
