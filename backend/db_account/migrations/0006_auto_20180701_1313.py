# Generated by Django 2.0.6 on 2018-07-01 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0005_remove_account_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='facebook_content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='instagram_content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='other_content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='twitter_content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='vk_content_type',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='account',
            name='youtube_content_type',
            field=models.IntegerField(default=0),
        ),
    ]