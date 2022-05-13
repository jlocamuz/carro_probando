from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(ClientDetail)
admin.site.register(ShoppingCart)
admin.site.register(CartDetail)
admin.site.register(Sale)
admin.site.register(SaleDetail)