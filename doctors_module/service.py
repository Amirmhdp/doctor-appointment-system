from datetime import datetime, timedelta, date
from django.db import IntegrityError
from django.db import transaction
from .models import WeeklySchedule,ScheduleException,AvailableSlot,Appointment


class SlotNotAvailableError(Exception):
    pass

def generate_slots_for_date(doctor, date):

    exception = ScheduleException.objects.filter(doctor=doctor, date=date).first()

    if exception:

        if not exception.is_available:
            return

        if not exception.start_time or not exception.end_time:
            return

        if not exception.duration:
            return

        generate_slots(doctor=doctor, date=date, start_time=exception.start_time, end_time=exception.end_time, duration=exception.duration)
        return

    weekday = (date.weekday() + 2) % 7

    schedule = WeeklySchedule.objects.filter(doctor=doctor, weekday=weekday, is_active=True).prefetch_related('periods').first()

    if not schedule:
        return

    for period in schedule.periods.all():
        generate_slots(doctor=doctor, date=date, start_time=period.start_time, end_time=period.end_time, duration=period.duration)

def generate_slots(doctor, date, start_time, end_time, duration):

    current_datetime = datetime.combine(date, start_time)

    end_datetime = datetime.combine(date, end_time)

    slots = []

    while current_datetime + timedelta(minutes=duration) <= end_datetime:

        slot_start = current_datetime.time()

        current_datetime += timedelta(minutes=duration)

        slot_end = current_datetime.time()

        slots.append(
            AvailableSlot(doctor=doctor, date=date, start_time=slot_start, end_time=slot_end,)
        )

    AvailableSlot.objects.bulk_create(slots, ignore_conflicts=True)

def generate_slots_for_days(doctor, days=30):
    """
    تولید Slot برای چند روز آینده پزشک.
    """

    today = date.today()

    for i in range(days):
        target_date = today + timedelta(days=i)

        generate_slots_for_date(doctor=doctor, date=target_date)

def book_appointment(patient, slot_id):

    with transaction.atomic():

        try:
            slot = (
                AvailableSlot.objects
                .select_for_update()
                .get(id=slot_id, is_available=True)
            )
        except AvailableSlot.DoesNotExist:
            raise SlotNotAvailableError('این زمان دیگر قابل رزرو نیست.')

        try:
            appointment = Appointment.objects.create(doctor=slot.doctor, patient=patient, available_slot=slot, status='pending')
        except IntegrityError:
            raise SlotNotAvailableError(
                'این زمان قبلاً رزرو شده است.'
            )

        slot.is_available = False
        slot.save(update_fields=['is_available'])

    return appointment