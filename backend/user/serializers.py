from .models import User, OTP
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'fName', 'lName', 'password', 'is_staff', 'is_superuser', "userIMG", 'has2FA']


class ResetPasswordSerializer(serializers.Serializer):
    model = User
    email = serializers.CharField(required=True)
    port = serializers.CharField(required=True)


class ResetPasswordConfirmSerializer(serializers.Serializer):
    model = User
    uID = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class OTPSerializer(serializers.Serializer):
    model = OTP
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    token = serializers.CharField(required=True)

