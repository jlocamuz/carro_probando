import email
from multiprocessing.connection import Client
from operator import index
from django.db import migrations, models
from json import loads

from sqlalchemy import true

from app_sc.models import ClientDetail

def addUsers(apps, schema_editor):
   User = apps.get_model('app_sc', 'User')
   with open("/code_shopping_cart/shopping_cart/app_sc/dummy_users_data.json", 'r') as f:
        raw_data = f.read()
        data = loads(raw_data)
        for row in data["rows"]:
            User.objects.create(
                               id=row["id"], 
                               password=row["password"],
                               name=row["name"],
                               email=row["email"],
                               is_admin = row["is_admin"]
                               )

            print("Added User: {}".format(row["name"]))



class Migration(migrations.Migration):
    dependencies = [
        ('app_sc', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(addUsers),
    ]
