from django.db import models
from django.utils import timezone
from django.utils.deconstruct import deconstructible
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import User

import os, uuid

class Twitter(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Twitter")

class Facebook(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Facebook")

class Youtube(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Youtube")

class Instagram(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Instagram")

class Vk(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Vk")

class Twitch(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Twitch")

class Other(models.Model):
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    link           = models.CharField(max_length=200)
    title          = models.CharField(max_length=30)
    details        = models.TextField()
    content_type   = models.IntegerField(default=0)
    price          = models.IntegerField(default=0)
    second_price   = models.IntegerField(default=0)
    price_type     = models.IntegerField(default=1)
    price_currency = models.IntegerField(default=1)
    status         = models.IntegerField(default=1)

    def __str__(self):
        return ('Product #%s'%self.pk)

    class Meta:
        verbose_name_plural = _("Other")
