from django.urls import path
from . import views
app_name = 'api_market'

urlpatterns = [
    path('load_data/', views.LoadData, name='LoadData')
]
