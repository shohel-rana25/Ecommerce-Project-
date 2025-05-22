from .models import CartItemModel, CategoryModel, ProductModel,OrderItemModel, OrderModel, PaymentModel, ReviewModel
from rest_framework import serializers


from django.db.models import Avg
class ProductModelSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=CategoryModel.objects.all())
    average_rating = serializers.SerializerMethodField()  # 👈 add this

    class Meta:
        model = ProductModel
        fields = '__all__'

    def get_average_rating(self, obj):
        avg = obj.reviews.aggregate(avg_rating=Avg('rating'))['avg_rating']
        return round(avg, 1) if avg else None


class CategoryModelSerializer(serializers.ModelSerializer):
    products = ProductModelSerializer(many=True, read_only=True)  
    class Meta:
        model=CategoryModel
        fields='__all__'



class OrderItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItemModel
        fields='__all__'

class CartItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartItemModel
        fields='__all__'

class OrderModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderModel
        fields='__all__'

class PaymentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=PaymentModel
        fields='__all__'

# class ReviewModelSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='user.username', read_only=True)  # optional, for display
#     product_name = serializers.CharField(source='product.name', read_only=True)  # optional, for display
    
#     class Meta:
#         model=ReviewModel
#         fields='__all__'
#         read_only_fields = ['created_at']
        
class ReviewModelSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = ReviewModel
        fields = '__all__'
        read_only_fields = ['created_at', 'user']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

