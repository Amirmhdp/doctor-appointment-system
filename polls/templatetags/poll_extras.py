from django import template
import jdatetime
import datetime
register = template.Library()


@register.filter
def times(number):
    return range(number)



@register.filter
def to_jalali(value):
    if not value:
        return ''

    if isinstance(value, datetime.datetime):
        jalali_date = jdatetime.datetime.fromgregorian(datetime=value)
    elif isinstance(value, datetime.date):
        jalali_date = jdatetime.date.fromgregorian(date=value)
    else:
        return ''

    return jalali_date.strftime('%Y/%m/%d')

@register.filter
def weekday_fa(value):
    weekdays = {
        0: 'دوشنبه',
        1: 'سه‌شنبه',
        2: 'چهارشنبه',
        3: 'پنج‌شنبه',
        4: 'جمعه',
        5: 'شنبه',
        6: 'یکشنبه',
    }

    return weekdays.get(value.weekday(), '')


@register.filter
def thousand_separator(value):
    try:
        return f"{int(value):,}"
    except (ValueError, TypeError):
        return value