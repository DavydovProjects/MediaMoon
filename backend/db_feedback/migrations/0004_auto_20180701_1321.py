# Generated by Django 2.0.6 on 2018-07-01 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_feedback', '0003_feedback_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='user',
        ),
        migrations.AddField(
            model_name='feedback',
            name='from_user',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='feedback',
            name='to_user',
            field=models.IntegerField(default=0),
        ),
    ]
