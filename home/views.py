from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.


# header render partial
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST
from django.views.generic import TemplateView

from doctors_module.models import Specialty, Doctor, Province
from home.forms import LiveSearchForm
from home.models import RecentSearch
from public_module.models import Footer


def header_component(request):
    search_form = LiveSearchForm()
    recent_searches = RecentSearch.objects.filter(user=request.user.id).distinct()[:8]

    context = {
        'search_form': search_form,
        'recent_searches': recent_searches
    }
    return render(request, 'shared/header.html', context)

@require_POST
def live_search(request):
    form_search = LiveSearchForm(request.POST)
    if form_search.is_valid():
        searched_value = form_search.cleaned_data['search']
        doctors = Doctor.objects.filter(
            Q(user__first_name__icontains=searched_value)|
            Q(user__last_name__icontains=searched_value)|
            Q(specialties__name__icontains=searched_value) |
            Q(clinics__province__name__icontains=searched_value)).select_related('user').prefetch_related('specialties').distinct()[:6]

        context = {
            'doctors': doctors
        }
        if not doctors:
            return JsonResponse({
                'success': False,
                'message': 'هیچ پزشکی پیدا نشد',
                'result_search': render_to_string('home/include/result_search.html', context)
            })
        else:
            return JsonResponse({
                'success': True,
                'message': 'دکتر پیدا شد',
                'result_search': render_to_string('home/include/result_search.html', context)
            })

@require_POST
@login_required
def save_recent_search(request):
    form_search = LiveSearchForm(request.POST)

    if form_search.is_valid():
        searched_value = form_search.cleaned_data['search']
        RecentSearch.objects.create(user=request.user,search=searched_value)
        recent_searches = RecentSearch.objects.filter(user=request.user.id)[:8]
        context = {
            'recent_searches': recent_searches
        }
        return JsonResponse({
            'success': True,
            'recent_search': render_to_string('home/include/recent_search.html', context, request=request)
        })

    return JsonResponse({
        'success': False
    })


def footer_component(request):
    footer = Footer.objects.filter(is_active=True, id=1).prefetch_related('fast_link').first()
    context = {
        'footer': footer
    }
    return render(request, 'shared/footer.html', context)


class Home(TemplateView):
    template_name = 'home/home.html'

    def get_context_data(self, **kwargs):
        context = super(Home, self).get_context_data()
        provinces = Province.objects.all()
        specialties = Specialty.objects.filter(is_active=True)
        doctors = Doctor.objects.filter(is_active=True).select_related('user').prefetch_related('specialties')[:12]
        context['specialties'] = specialties
        context['doctors'] = doctors
        context['provinces'] = provinces
        return context



