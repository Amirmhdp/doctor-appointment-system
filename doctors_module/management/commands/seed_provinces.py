from django.core.management.base import BaseCommand

from doctors_module.models import Province


class Command(BaseCommand):
    help = 'Create Iranian provinces'

    PROVINCES = [
        'آذربایجان شرقی',
        'آذربایجان غربی',
        'اردبیل',
        'اصفهان',
        'البرز',
        'ایلام',
        'بوشهر',
        'تهران',
        'چهارمحال و بختیاری',
        'خراسان جنوبی',
        'خراسان رضوی',
        'خراسان شمالی',
        'خوزستان',
        'زنجان',
        'سمنان',
        'سیستان و بلوچستان',
        'فارس',
        'قزوین',
        'قم',
        'کردستان',
        'کرمان',
        'کرمانشاه',
        'کهگیلویه و بویراحمد',
        'گلستان',
        'گیلان',
        'لرستان',
        'مازندران',
        'مرکزی',
        'هرمزگان',
        'همدان',
        'یزد',
    ]

    def handle(self, *args, **options):
        for province_name in self.PROVINCES:
            province, created = Province.objects.get_or_create(
                name=province_name
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Province "{province_name}" created.'
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f'Province "{province_name}" already exists.'
                    )
                )

        self.stdout.write(
            self.style.SUCCESS('Provinces seeding completed.')
        )