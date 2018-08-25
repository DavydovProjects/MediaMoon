from django.urls import path, include

from . import views

app_name = 'api_ban'

urlpatterns = [
    path('check/', views.CheckOnBanList, name='CheckOnBanList'),
    path('set/', views.AccounAddToBanList, name='AccounAddToBanList'),
    path('remove/', views.AccounRemoveFromBanList, name='AccounRemoveFromBanList'),

    path('load_list/', views.LoadBansList, name='LoadBansList')
]
