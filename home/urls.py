from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('live-search', views.live_search, name='live_search'),
    path('save-recent-search', views.save_recent_search, name='recent_search')
]