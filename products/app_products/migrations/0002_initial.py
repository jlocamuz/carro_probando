from operator import index
from django.db import migrations, models
from json import loads

def addDistributors(apps, schema_editor):
    Distributor = apps.get_model('app_products', 'Distributor')
    with open("/code_products/products/app_products/dummy_distributors_data.json", 'r') as f:
        raw_data = f.read()
        data = loads(raw_data)
        for row in data["rows"]:
            Distributor.objects.create(
                                    distributor_name=row["distributor_name"], 
                                    distributor_description=row["distributor_description"])

            print("Added Distributor: {}".format(row["distributor_name"]))

def addProducts(apps, schema_editor):
    Product = apps.get_model('app_products', 'Product')
    Distributor = apps.get_model('app_products', 'Distributor')
    with open("/code_products/products/app_products/dummy_products_data.json", 'r') as f:
        raw_data = f.read()
        data = loads(raw_data)
        for row in data["rows"]:
            distributor1 = Distributor.objects.get(distributor_name=row["distributor"])
            Product.objects.create(
                product_name=row["product_name"],
                product_description=row["product_description"],
                product_price=row["product_price"],
                product_qt=row["product_qt"],
                distributor=distributor1
            )
            print("Added Product: {}".format(row["product_name"]))
class Migration(migrations.Migration):
    dependencies = [
        ('app_products', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(addDistributors),
        migrations.RunPython(addProducts)
        
    ]