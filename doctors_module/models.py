from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.conf import settings
from django.utils.text import slugify
from account_module.models import User
from patient.models import Patient

# Create your models here.


class Specialty(models.Model):
    name = models.CharField(max_length=60, verbose_name='نام')
    url_title = models.SlugField(max_length=100,null=True, blank=True, db_index=True, unique=True,verbose_name='نام در url')
    image = models.ImageField(upload_to='images/specialty', verbose_name='تصویر')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    is_active = models.BooleanField(default=True, verbose_name='فعال / غیرفعال')
    def save(self, *args, **kwargs):
        self.url_title = slugify(self.name, allow_unicode=True)
        super(Specialty, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'تخصص'
        verbose_name_plural = 'تخصص ها'

class Doctor(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='doctor_profile',
        verbose_name='کاربر'
    )
    url_title = models.SlugField(null=True, blank=True, max_length=100, db_index=True, unique=True,verbose_name='نام در url')

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
    short_description = models.TextField(null=True, blank=True, verbose_name='توضیحات کوتاه')

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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        self.url_title = f"{slugify(self.user, allow_unicode=True)}-{self.id}"

        super().save(update_fields=['url_title'])

    def __str__(self):
        return f'{self.user}'

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
    email = models.EmailField(
        null=True,
        blank=True,
        verbose_name='ایمیل',
    )
    phone_number = models.CharField(
        verbose_name='شماره تماس',
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

class WeeklySchedule(models.Model):
    WEEKDAYS = [
        (0, 'شنبه'),
        (1, 'یکشنبه'),
        (2, 'دوشنبه'),
        (3, 'سه‌شنبه'),
        (4, 'چهارشنبه'),
        (5, 'پنجشنبه'),
        (6, 'جمعه'),
    ]
    doctor = models.ForeignKey(Doctor, models.CASCADE,related_name='weekly_schedules', verbose_name='پزشک')
    weekday = models.PositiveSmallIntegerField(choices=WEEKDAYS, verbose_name='روز هفته')
    is_active = models.BooleanField(default=True, verbose_name='فعال / غیرفعال')

    def __str__(self):
        return f'{self.doctor.user} - {self.get_weekday_display()}'

    class Meta:
        verbose_name = 'برنامه هفتگی'
        verbose_name_plural = 'برنامه‌های هفتگی'

        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'weekday'],
                name='unique_doctor_weekday'
            )
        ]

class SchedulePeriod(models.Model):
    schedule = models.ForeignKey(WeeklySchedule, on_delete=models.CASCADE,related_name='periods', verbose_name='برنامه هفتگی')
    start_time = models.TimeField(verbose_name='زمان شروع')
    end_time = models.TimeField(verbose_name='زمان پایان')
    duration = models.PositiveIntegerField(verbose_name='مدت هر ویزیت', help_text='بر حسب دقیقه')
    def __str__(self):
        return f"{self.start_time} - {self.end_time} - {self.duration} دقیقه "

    class Meta:
        verbose_name = 'بازه زمانی برنامه'
        verbose_name_plural = 'بازه‌های زمانی برنامه'

class ScheduleException(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='schedule_exceptions',
        verbose_name='پزشک'
    )

    date = models.DateField(
        verbose_name='تاریخ'
    )

    is_available = models.BooleanField(
        default=False,
        verbose_name='در دسترس'
    )

    start_time = models.TimeField(
        null=True,
        blank=True,
        verbose_name='شروع کار'
    )

    end_time = models.TimeField(
        null=True,
        blank=True,
        verbose_name='پایان کار'
    )

    duration = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name='مدت هر ویزیت',
        help_text='بر حسب دقیقه'
    )

    reason = models.TextField(
        verbose_name='دلیل'
    )

    def __str__(self):
        return self.reason

    class Meta:
        verbose_name = 'استثنای برنامه کاری'
        verbose_name_plural = 'استثناهای برنامه کاری'

        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'date'],
                name='unique_doctor_exception_date'
            )
        ]

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

        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'date', 'start_time'],
                name='unique_doctor_slot'
            )
        ]

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

    available_slot = models.ForeignKey(
        AvailableSlot,
        on_delete=models.PROTECT,
        related_name='appointments',
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

        constraints = [
            models.UniqueConstraint(
                fields=['available_slot'],
                condition=models.Q(
                    status__in=['pending', 'confirmed', 'completed']
                ),
                name='unique_active_appointment_per_slot'
            )
        ]

class Comment(models.Model):
    parent = models.ForeignKey('Comment', on_delete=models.CASCADE,null=True, blank=True, verbose_name='والد')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, verbose_name='دکتر', related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True, verbose_name='کاربر')
    is_like = models.BooleanField(default=True, verbose_name='لایک / دیس لایک')
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True,verbose_name='تاریخ ایجاد')
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5),
        ],
        null=True,
        blank=True,
        verbose_name='امتیاز'
    )
    text = models.TextField(verbose_name='متن پیام')
    is_active = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'کامنت'
        verbose_name_plural = 'کامنت ها'

class Education(models.Model):
    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name='educations',
        verbose_name='دکتر'
    )
    degree = models.CharField(
        max_length=200,
        verbose_name='مدرک تحصیلی'
    )
    university = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='دانشگاه'
    )

    def __str__(self):
        return self.degree

    class Meta:
        verbose_name = "تحصیل"
        verbose_name_plural = 'تحصیلات'

class FAQ(models.Model):
    specialties = models.ManyToManyField(
        'Specialty',
        related_name='faqs',
        blank=True,
        verbose_name='تخصص‌ها'
    )

    question = models.CharField(
        max_length=300,
        verbose_name='سوال'
    )

    answer = models.TextField(
        verbose_name='پاسخ'
    )

    order = models.PositiveIntegerField(
        default=0,
        verbose_name='ترتیب نمایش'
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name='فعال'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )

    def __str__(self):
        return self.question

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'سوال متداول'
        verbose_name_plural = 'سوالات متداول'

class Rule(models.Model):
    title = models.CharField(
        max_length=200,
        verbose_name='عنوان'
    )

    content = models.TextField(
        verbose_name='متن قانون'
    )

    order = models.PositiveIntegerField(
        default=0,
        verbose_name='ترتیب نمایش'
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name='فعال'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='آخرین بروزرسانی'
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'قانون'
        verbose_name_plural = 'قوانین'

