from django.db import models
from django.utils import timezone
from django.utils.deconstruct import deconstructible
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import User

import os, uuid

@deconstructible
class RandomFileName(object):
    def __init__(self, path):
        self.path = os.path.join(path, "%s%s")

    def __call__(self, _, filename):
        # @note It's up to the validators to check if it's the correct file type in name or if one even exist.
        extension = os.path.splitext(filename)[1]
        return self.path % (uuid.uuid4(), extension)


class Account(models.Model):
    user                   = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname               = models.CharField(max_length=30, blank=True)

    information            = models.CharField(max_length=300, blank=True)

    verified               = models.BooleanField(default=False)

    email                  = models.EmailField(max_length=40, blank=True)
    email_is_confirmed     = models.BooleanField(default=False)
    email_confirm_code     = models.CharField(max_length=50)

    contact_email          = models.CharField(max_length=50)

    password_reset_code    = models.CharField(max_length=50, default=0)

    status                 = models.CharField(max_length=50, default='User of MediaMoon')

    main_lang              = models.CharField(max_length=50)

    show_in_market         = models.BooleanField(default=True)
    accept_orders          = models.BooleanField(default=True)

    show_feedback          = models.BooleanField(default=True)

    balance                = models.IntegerField(default=0)

    staff_level            = models.IntegerField(default=0)

    is_banned              = models.BooleanField(default=False)

    reg_date               = models.DateField(editable=True, default=timezone.now)

    reg_ip                 = models.GenericIPAddressField(blank=True, null=True)
    last_ip                = models.GenericIPAddressField(blank=True, null=True)

    def __str__(self):
        return '%s(%s)'%(self.nickname, self.user)


class AccountAvatar(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    avatar  = models.FileField(upload_to=RandomFileName('users_avatars/'), default='users_avatars/_user_default_avatar.svg')
    date    = models.DateField(default=timezone.now)

    def __str__(self):
        return "%s's avatar"%(self.account.nickname)


class AccountProfileWallpaper(models.Model):
    account    = models.OneToOneField(Account, on_delete=models.CASCADE)
    wallpaper  = models.FileField(upload_to=RandomFileName('profile_wallpapers/'), default='profile_wallpapers/_default_profile_wallpaper.png')
    date       = models.DateField(default=timezone.now)

    def __str__(self):
        return "%s's profile wallpaper" % (self.account.nickname)


class AccountBans(models.Model):
    from_user = models.IntegerField(default=0)
    to_user   = models.IntegerField(default=0)
    date      = models.DateField(default=timezone.now)

    class Meta:
        verbose_name_plural = _("Account bans")

    def __str__(self):
        return "%s banned %s" % (self.from_user, self.to_user)
