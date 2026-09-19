from django.core.validators import RegexValidator
from django.db import models

# Create your models here.

class SettingsModel(models.Model):
    site_name = models.CharField(max_length=50,verbose_name='نام سایت')
    site_url = models.CharField(max_length=100,verbose_name='آدرس سایت')
    address = models.CharField(max_length=100,null=True,blank=True,verbose_name='آدرس')
    phone = models.CharField(max_length=20, null=True, blank=True, verbose_name='تلفن')
    phone_number = models.CharField(max_length=20, null=True, blank=True, verbose_name='شماره تلفن')
    instagram_url = models.CharField(max_length=50, null=True, blank=True, verbose_name='آدرس اینستاگرام')
    linkedin_url = models.CharField(max_length=50, null=True, blank=True, verbose_name='آدرس لینکدین')
    telegram_url = models.CharField(max_length=20, null=True, blank=True, verbose_name='آدرس تلگرام')
    title_about_medicare = models.CharField(max_length=150, null=True, blank=True, verbose_name='عنوان درباره مدیکر')
    about_medicare = models.TextField(null=True, blank=True, verbose_name='درباره مدیکر')
    title_mission = models.CharField(max_length=150, null=True, blank=True, verbose_name='عنوان ماموریت')
    mission = models.TextField(null=True, blank=True, verbose_name='ماموریت')
    why_medicare_title = models.CharField(max_length=150, null=True, blank=True, verbose_name='عنوان چرا مدیکر')
    why_medicare = models.TextField(null=True, blank=True, verbose_name='چرا مدیکر')
    is_active = models.BooleanField(default=False, verbose_name="فعال / غیرفعال")
    def __str__(self):
        return self.site_name

    class Meta:
        verbose_name = 'تنظیمات سایت'
        verbose_name_plural = 'تنظیمات سایت'

class ContactUs(models.Model):
    name = models.CharField(max_length=50,verbose_name='نام')
    last_name = models.CharField(max_length=50,verbose_name='نام خانوادگی')
    phone_number = models.CharField(max_length=11,
        validators=[
            RegexValidator(
                regex=r'^09\d{9}$',
                message='شماره موبایل باید با 09 شروع شود و 11 رقم باشد.'
            )
        ],
        verbose_name="شماره موبایل"
    )
    title_message = models.CharField(max_length=120, verbose_name='عنوان پیام')
    message = models.TextField(verbose_name='متن پیام')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ارسال')

    def __str__(self):
        return f'{self.name} {self.last_name}'

    class Meta:
        verbose_name = 'تماس با ما'
        verbose_name_plural = 'تماس با ما'
        ordering = ['-created_at']

class FastLink(models.Model):
    title = models.CharField(max_length=100, verbose_name='عنوان')
    url_title = models.CharField(max_length=100, verbose_name='عنوان در url')
    is_active = models.BooleanField(default=True, verbose_name='فعال پ غیرفعال')

    class Meta:
        verbose_name = 'لینک سریع'
        verbose_name_plural = 'لینک های سریع'
    def __str__(self):
        return self.title

class Footer(models.Model):
    about_medicare = models.TextField(null=True, blank=True, verbose_name='درباره مدیکر')
    fast_link = models.ManyToManyField(FastLink, verbose_name='لینک سریع')
    copyright = models.CharField(max_length=150, null=True, blank=True, verbose_name='قانون کپی رایت')
    is_active = models.BooleanField(default=True, verbose_name='فعال / غیرفعال')

    def __str__(self):
        return self.copyright
    class Meta:
        verbose_name = 'فوتر'
        verbose_name_plural = 'فوتر'
