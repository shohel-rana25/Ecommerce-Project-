from django.contrib import admin
from .models import CategoryModel, ProductModel, OrderModel, OrderItemModel, CartItemModel, ReviewModel


@admin.register(CategoryModel)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(ProductModel)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'stock', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description']


@admin.register(OrderModel)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'created_at', 'total_price']
    list_filter = ['status', 'created_at']
    search_fields = ['user__username']


@admin.register(OrderItemModel)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'price']
    search_fields = ['product__name', 'order__id']


@admin.register(CartItemModel)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product', 'quantity']

from .models import PaymentModel

@admin.register(PaymentModel)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'method', 'amount', 'paid', 'transaction_id', 'created_at')


@admin.register(ReviewModel)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product', 'rating', 'created_at']
    list_filter = ['rating']
