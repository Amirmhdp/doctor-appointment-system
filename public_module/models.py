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
