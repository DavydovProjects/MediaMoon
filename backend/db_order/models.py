from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone

from django.contrib.auth.models import User

class Order(models.Model):
    from_user     = models.IntegerField(default=0)
    to_user       = models.IntegerField(default=0)
    status        = models.IntegerField(default=0)
    date          = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return ('Order #%s'%self.pk)

class OrderProduct(models.Model):
    order         = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_model = models.CharField(max_length=50)
    product_title = models.CharField(max_length=50)

    def __str__(self):
        return ('Product of oreder #%s'%self.order.pk)

class OrderComment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    user  = models.ForeignKey(User, on_delete=models.CASCADE)
    text  = models.TextField()
    date  = models.DateField(default=timezone.now)

    def __str__(self):
        return ('OrderComment #%s'%self.pk)
