from django.urls import path
from . import views

app_name = 'api_order'

urlpatterns = [
    path('create/', views.CreateOrder, name='CreateOrder'),

    path('load/<type>/', views.LoadOrders, name='LoadOrders'),

    path('load_one/', views.LoadOrder, name='LoadOrder'),

    path('load_comments/', views.LoadOrderComments, name='LoadOrderComments'),

    path('send_comment/', views.SendComment, name='SendComment'),

    path('change_status/<status>/', views.ChangeOrderStatus, name='ChangeOrderStatus')
]
