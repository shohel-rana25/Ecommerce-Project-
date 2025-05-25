from rest_framework import viewsets, permissions
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import* 
from .serializers import UserSerializer, CartItemModelSerializer, ProductModelSerializer, OrderItemModelSerializer, OrderModelSerializer, CartItemModelSerializer, ReviewModelSerializer,CategoryModelSerializer


from rest_framework import generics, permissions
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView

# views.py
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = CategoryModel.objects.all()
    serializer_class = CategoryModelSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductModelSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItemModel.objects.all()
    serializer_class = OrderItemModelSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItemModel.objects.all()
    serializer_class = CartItemModelSerializer



class PaymentViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'])
    def confirm_payment(self, request):
        order_id = request.data.get('order_id')
        method = request.data.get('method')
        txn_id = request.data.get('transaction_id')

        try:
            order = OrderModel.objects.get(id=order_id)
        except OrderModel.DoesNotExist:
            return Response({'error': 'Order not found.'}, status=status.HTTP_404_NOT_FOUND)

        payment = PaymentModel.objects.create(
            order=order,
            method=method,
            amount=order.total_price,
            paid=True,
            transaction_id=txn_id
        )

        order.status = 'CONFIRMED'
        order.save()

        return Response({'message': 'Payment confirmed.'}, status=status.HTTP_200_OK)



# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = ReviewModel.objects.all()
#     serializer_class = ReviewModelSerializer

# from rest_framework.permissions import AllowAny

# class ReviewViewSet(viewsets.ModelViewSet):
#     queryset = ReviewModel.objects.all()
#     serializer_class = ReviewModelSerializer
#     permission_classes = [AllowAny]
    
#     def get_serializer_context(self):
#         return {'request': self.request}

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = ReviewModel.objects.all()
    serializer_class = ReviewModelSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    @action(detail=False, methods=['get'])
    def by_product(self, request):
        product_id = request.query_params.get('product')
        reviews = ReviewModel.objects.filter(product__id=product_id)
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)


from rest_framework.decorators import api_view
@api_view(['GET'])
def products_by_category(request):
    category_id = request.GET.get('category')
    products = ProductModel.objects.filter(category_id=category_id)
    serializer = ProductModelSerializer(products, many=True)
    return Response(serializer.data)  

