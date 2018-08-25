from django.urls import path, include

from . import views

app_name = 'api_feedback'

urlpatterns = [
    path('add/', views.AddFeedback, name='AddFeedback'),
    path('delete/', views.DeleteFeedback, name='DeleteFeedback'),

    path('report/', views.ReportFeedback, name='ReportFeedback'),

    path('get/<username>/', views.GetFeedback, name='GetFeedback')
]
