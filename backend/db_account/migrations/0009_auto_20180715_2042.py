# Generated by Django 2.0.6 on 2018-07-15 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0008_account_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='status',
            field=models.CharField(default='Blogger', max_length=50),
        ),
    ]