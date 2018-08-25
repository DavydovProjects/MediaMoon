# Generated by Django 2.0.6 on 2018-07-31 17:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0015_auto_20180729_0827'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountBans',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_user', models.IntegerField(default=0)),
                ('to_user', models.IntegerField(default=0)),
                ('date', models.DateField(default=django.utils.timezone.now)),
            ],
        ),
    ]
