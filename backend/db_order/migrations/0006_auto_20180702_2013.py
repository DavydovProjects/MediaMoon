# Generated by Django 2.0.6 on 2018-07-02 20:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('db_order', '0005_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordercomment',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='db_order.Order'),
        ),
    ]
