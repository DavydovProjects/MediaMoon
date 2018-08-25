from django.urls import path, include

from . import views

app_name = 'api_like'

urlpatterns = [
    path('check/', views.CheckLike, name='CheckLike'),

    path('add/', views.AddLike, name='AddLike'),
    path('remove/', views.RemoveLike, name='RemoveLike'),

    path('load_likes/', views.LoadLikes, name='LoadLikes')
]
