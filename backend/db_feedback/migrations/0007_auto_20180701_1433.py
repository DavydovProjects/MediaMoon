# Generated by Django 2.0.6 on 2018-07-01 14:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('db_feedback', '0006_auto_20180701_1424'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedbackreport',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='feedbackreport',
            name='user',
            field=models.IntegerField(default=0),
        ),
    ]