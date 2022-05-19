from dataclasses import dataclass
from http import client
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

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
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data['id'])
        client_detail = request.data['client_detail']
        sc = ShoppingCart.objects.filter(client_detail=client_detail).first()
        cd = CartDetail.objects.filter(sc=sc)
        sale = Sale.objects.get(id=serializer.data['id'])
        for i in cd:
            product = i.product
            product_quantity = int(i.product_quantity)
            sale_d = SaleDetail(sale=sale, product=product, product_quantity=product_quantity)
            sale_d.save()
            i.delete()

        sc.sc_total_price = 0.0
        sc.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
   

class ShoppingCartViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sc = ShoppingCart.objects.filter(client_detail=request.data['client_detail']).first()
        print(sc)
        if sc == None: 
            sc = ShoppingCart.objects.filter(client_detail=request.data['client_detail']).first()
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        headers = self.get_success_headers(serializer.data)
        return Response(ShoppingCartSerializer(sc).data, status=status.HTTP_200_OK, headers=headers)
    def perform_create(self, serializer):
        serializer.save()

    def retrieve(self, request, pk=None):
        print(pk)
        queryset = ShoppingCart.objects.all()
        user = get_object_or_404(queryset, client_detail=pk)
        serializer = ShoppingCartSerializer(user)
        return Response(serializer.data)



    
class ClientDetailViewSet(viewsets.ModelViewSet):
    serializer_class = ClientDetailSerializer
    queryset = ClientDetail.objects.all()

class SaleDetailViewSet(viewsets.ModelViewSet):
    serializer_class = SaleDetailSerializer
    queryset = SaleDetail.objects.all()

class CartDetailViewSet(viewsets.ModelViewSet):
    serializer_class = CartDetailSerializer
    queryset = CartDetail.objects.all()
    def create(self, request, *args, **kwargs):
        params = request.query_params.dict()
        sc = ShoppingCart.objects.filter(id=request.data['sc']).first()

        precio_previo = sc.sc_total_price 
        sc.sc_total_price = precio_previo + request.data['product_quantity'] * int(params['product_price'])
        sc.save()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        params = request.query_params.dict()
        product_price = int(params['product_price'])
        product_quantity = int(params['product_qt'])
        sc_id = int(params['sc'])
        sc = ShoppingCart.objects.filter(id=sc_id).first()
        precio_previo = sc.sc_total_price 
        sc.sc_total_price = precio_previo - product_price * product_quantity
        sc.save()

        instance = self.get_object()
        self.perform_destroy(instance)