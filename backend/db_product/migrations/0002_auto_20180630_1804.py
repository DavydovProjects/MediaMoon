# Generated by Django 2.0.6 on 2018-06-30 18:04

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('db_product', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='YoutubeProduct',
            new_name='Facebook',
        ),
        migrations.RenameModel(
            old_name='TwitterProduct',
            new_name='Instagram',
        ),
        migrations.RenameModel(
            old_name='FacebookProduct',
            new_name='Other',
        ),
        migrations.RenameModel(
            old_name='VkProduct',
            new_name='Twitter',
        ),
        migrations.RenameModel(
            old_name='InstagramProduct',
            new_name='Vk',
        ),
        migrations.RenameModel(
            old_name='OtherProduct',
            new_name='Youtube',
        ),
    ]