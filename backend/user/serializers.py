from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fName', 'lName', 'password']


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    # fields = ['password']
    newPassword = serializers.CharField(required=True)


