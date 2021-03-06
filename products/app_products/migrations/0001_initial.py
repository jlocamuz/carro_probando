# Generated by Django 3.2.8 on 2022-05-23 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Distributor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distributor_name', models.CharField(max_length=50)),
                ('distributor_description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=50)),
                ('product_description', models.CharField(max_length=200)),
                ('product_price', models.FloatField(max_length=50)),
                ('product_qt', models.IntegerField(default=0)),
                ('distributor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_products.distributor')),
            ],
        ),
    ]
