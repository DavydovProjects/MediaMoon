# Generated by Django 2.0.6 on 2018-07-04 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_product', '0004_twitch'),
    ]

    operations = [
        migrations.AddField(
            model_name='facebook',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='instagram',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='twitch',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='twitter',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='vk',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='youtube',
            name='content_type',
            field=models.IntegerField(default=0),
        ),
    ]
