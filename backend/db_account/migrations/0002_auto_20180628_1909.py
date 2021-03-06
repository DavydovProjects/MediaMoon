# Generated by Django 2.0.6 on 2018-06-28 19:09

import db_account.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('db_account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountAvatar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.FileField(default='users_avatars/_user_default_avatar.svg', upload_to=db_account.models.RandomFileName('users_avatars/'))),
                ('date', models.DateField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.RenameField(
            model_name='account',
            old_name='email_cofirm_code',
            new_name='email_confirm_code',
        ),
        migrations.AddField(
            model_name='accountavatar',
            name='account',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='db_account.Account'),
        ),
    ]
