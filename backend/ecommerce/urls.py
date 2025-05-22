from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, OrderViewSet,
    OrderItemViewSet, CartItemViewSet, ReviewViewSet,PaymentViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'reviews', ReviewViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
