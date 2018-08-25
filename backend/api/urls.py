from django.urls import path, include

from . import views

app_name = 'api'

urlpatterns = [
    path('user/', include('api_user.urls')),
    path('feedback/', include('api_feedback.urls')),
    path('like/', include('api_like.urls')),
    path('ban/', include('api_ban.urls')),

    path('order/', include('api_order.urls')),
    path('product/', include('api_product.urls')),
    path('market/', include('api_market.urls')),

    path('check_auth/', views.CheckAuth, name='CheckAuth')
]
