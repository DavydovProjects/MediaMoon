from django.contrib import admin
from db_account.models import *

class db_account(admin.ModelAdmin):
    list_display = ('id', 'user', 'nickname', 'verified', 'email', 'email_is_confirmed', 'status', 'main_lang', 'staff_level', 'is_banned', 'reg_date', 'reg_ip', 'last_ip')
admin.site.register(Account, db_account)


class db_account_avatar(admin.ModelAdmin):
    list_display = ('id', 'account', 'avatar', 'date')
admin.site.register(AccountAvatar, db_account_avatar)


class db_profile_wallpaper(admin.ModelAdmin):
    list_display = ('id', 'account', 'wallpaper', 'date')
admin.site.register(AccountProfileWallpaper, db_profile_wallpaper)



class db_account_bans(admin.ModelAdmin):
    list_display = ('id', 'from_user', 'to_user', 'date')
admin.site.register(AccountBans, db_account_bans)
