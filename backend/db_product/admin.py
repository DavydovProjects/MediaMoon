from django.contrib import admin
from db_product.models import *

class db_twitter(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Twitter, db_twitter)

class db_facebook(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Facebook, db_facebook)

class db_youtube(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Youtube, db_youtube)

class db_instagram(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Instagram, db_instagram)

class db_vk(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Vk, db_vk)

class db_twitch(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Twitch, db_twitch)

class db_other(admin.ModelAdmin):
    list_display = ('id', 'user', 'link', 'title', 'price', 'second_price', 'price_type')
admin.site.register(Other, db_other)
