# Generated by Django 2.0.6 on 2018-06-30 18:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FacebookProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InstagramProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OtherProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TwitterProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VkProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='YoutubeProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('title', models.CharField(max_length=30)),
                ('text', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('second_price', models.IntegerField(default=0)),
                ('price_type', models.IntegerField(default=1)),
                ('auto', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
