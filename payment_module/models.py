from django.db import models

# Create your models here.
from doctors_module.models import AvailableSlot
from patient.models import Patient


class Payment(models.Model):

    STATUS_CHOICES = [
        ('pending', 'در انتظار پرداخت'),
        ('success', 'پرداخت موفق'),
        ('failed', 'پرداخت ناموفق'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name='payments', verbose_name='بیمار')
    slot = models.ForeignKey(AvailableSlot, on_delete=models.PROTECT, related_name='payments', verbose_name='زمان نوبت')
    amount = models.PositiveIntegerField(verbose_name='مبلغ', help_text='مبلغ به ریال')
    authority = models.CharField(max_length=255, null=True, blank=True, verbose_name='شناسه تراکنش')
    ref_id = models.CharField(max_length=255, null=True, blank=True, verbose_name='کد پیگیری')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='وضعیت')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    paid_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ پرداخت')
    def __str__(self):
        return f'{self.patient} - {self.amount} ریال - {self.get_status_display()}'

    class Meta:
        verbose_name = 'پرداخت'
        verbose_name_plural = 'پرداخت ها'


