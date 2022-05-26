from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import *
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404


class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class DistributorViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = DistributorSerializer
    queryset = Distributor.objects.all()



