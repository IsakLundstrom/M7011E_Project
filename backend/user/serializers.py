from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fName', 'lName', 'password', 'is_staff', 'is_superuser', "userIMG"]


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    # fields = ['password']
    newPassword = serializers.CharField(required=True)


class ResetPasswordSerializer(serializers.Serializer):
    model = User
    email = serializers.CharField(required=True)
    port = serializers.CharField(required=True)


class ResetPasswordConfirmSerializer(serializers.Serializer):
    model = User
    uID = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
