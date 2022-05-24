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


    def create(self, request, *args, **kwargs):

        distributor_name = request.data['distributor']
        query = Distributor.objects.all()
        distributor = get_object_or_404(query, distributor_name=distributor_name)
        request.data['distributor'] = distributor.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class DistributorViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = DistributorSerializer
    queryset = Distributor.objects.all()



