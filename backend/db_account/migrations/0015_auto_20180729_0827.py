# Generated by Django 2.0.6 on 2018-07-29 08:27

import db_account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0014_auto_20180728_1551'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='verified',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accountprofilewallpaper',
            name='wallpaper',
            field=models.FileField(default='profile_wallpapers/_default_profile_wallpaper.png', upload_to=db_account.models.RandomFileName('profile_wallpapers/')),
        ),
    ]
