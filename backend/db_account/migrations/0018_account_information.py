# Generated by Django 2.0.6 on 2018-08-01 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0017_auto_20180731_1751'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='information',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
