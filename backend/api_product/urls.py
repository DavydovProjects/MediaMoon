from django.urls import path
from . import views

app_name = 'api_product'

urlpatterns = [
    path('create/', views.CreateProduct, name='CreateProduct'),
    path('delete/', views.DeleteProduct, name='DeleteProduct'),

    path('load_data/', views.LoadData, name='LoadData'),
    path('load_one_data/', views.LoadOneData, name='LoadOneData'),

    path('edit/', views.EditProduct, name='EditProduct')
]
