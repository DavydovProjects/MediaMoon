from django.contrib import admin
from db_order.models import *

class db_order(admin.ModelAdmin):
    list_display = ('id', 'from_user', 'to_user', 'status')
admin.site.register(Order, db_order)

class db_order_comment(admin.ModelAdmin):
    list_display = ('id', 'order', 'user', 'date')
admin.site.register(OrderComment, db_order_comment)

class db_order_product(admin.ModelAdmin):
    list_display = ('id', 'order', 'product_model', 'product_title')
admin.site.register(OrderProduct, db_order_product)
