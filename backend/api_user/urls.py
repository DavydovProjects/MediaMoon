from django.urls import path, include
from . import views

app_name = 'api'

urlpatterns = [
    path('data/<username>/', views.UserData, name='UserData'),
    path('your_data/', views.YourData, name='YourData'),

    path('register/', views.Registration, name='Registration'),
    path('auth/', views.Authentication, name='Authentication'),

    path('ban/<user_id>/', views.BanUser, name='BanUser'),
    path('unban/<user_id>/', views.UnbanUser, name='UnbanUser'),
    path('delete/<user_id>/', views.DeleteUser, name='DeleteUser'),

    path('set_avatar/', views.SetAvatar, name='SetAvatar'),
    path('remove_avatar/', views.RemoveAvatar, name='RemoveAvatar'),

    path('set_profile_wallpaper/', views.SetProfileWallpaper, name='SetProfileWallpaper'),
    path('remove_profile_wallpaper/', views.RemoveProfileWallpaper, name='RemoveProfileWallpaper'),

    path('settings_account/', views.AccountSettings, name='AccountSettings'),
    path('settings_communication/', views.CommunicationSettings, name='CommunicationSettings'),
    path('settings_password/', views.PasswordSettings, name='PasswordSettings'),

    path('send_email_code/', views.SendEmailConfirmation, name='SendEmailConfirmation'),
    path('confirm_email/', views.EmailConfirmation, name='EmailConfirmation'),

    path('send_reset_password_code/', views.SendPasswordResetCode, name='SendPasswordResetCode'),
    path('recover_password/', views.RecoverPassword, name='RecoverPassword')
]
