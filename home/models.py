from django.db import models

# Create your models here.
from account_module.models import User


class RecentSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recent_searches')
    search = models.CharField(max_length=100, verbose_name='عبارت جستجو')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ جستجو')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'جستجوی اخیر'
        verbose_name_plural = 'جستجوهای اخیر'

    def __str__(self):
        return self.search
