from django.contrib import admin
from db_like.models import *

class db_like(admin.ModelAdmin):
    list_display = ('id', 'from_user', 'to_user', 'date')
admin.site.register(Like, db_like)
