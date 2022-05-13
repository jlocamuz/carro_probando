from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientDetailSerializer
    queryset = ClientDetail.objects.all()

class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = ClientDetailSerializer
    queryset = Sale.objects.all()

class ShoppingCartViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()


class ClientDetailViewSet(viewsets.ModelViewSet):
    serializer_class = ClientDetailSerializer
    queryset = ClientDetail.objects.all()

class SaleDetailViewSet(viewsets.ModelViewSet):
    serializer_class = SaleDetailSerializer
    queryset = SaleDetail.objects.all()

class CartDetailViewSet(viewsets.ModelViewSet):
    serializer_class = CartDetailSerializer
    queryset = CartDetail.objects.all()
