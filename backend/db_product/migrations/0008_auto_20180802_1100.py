# Generated by Django 2.0.6 on 2018-08-02 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_product', '0007_auto_20180727_1132'),
    ]

    operations = [
        migrations.AddField(
            model_name='facebook',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='instagram',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='other',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='twitch',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='twitter',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vk',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='youtube',
            name='details',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
