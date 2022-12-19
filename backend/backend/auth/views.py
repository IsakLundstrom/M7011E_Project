import datetime
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status, viewsets, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from random import choice
from string import digits
from django.utils import timezone

from .serializers import LoginSerializer, RegistrationSerializer
from user.models import OTP
from user.serializers import OTPSerializer
from ..send_mail import send_mail


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if user is not None and user.has2FA:
            token = ''.join(choice(digits) for i in range(6))
            if OTP.objects.all().filter(userID=user.id).exists():
                OTP.objects.get(userID=user.id).delete()

            otp = OTP(token=token, userID=user)
            otp.save()

            send_mail(
                html="<p>Here is your 2FA code</p><h1>" + token + "</h1>",
                subject='The Sweat Zone: 2FA token',
                from_email='sweatzone1337@gmail.com',
                to_emails=[email])

            return Response({"details": "2FA required"}, status=status.HTTP_200_OK)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class OTPVerify(generics.CreateAPIView):
    serializer_class = OTPSerializer

    def create(self, request, *args, **kwargs):

        email = request.data.get("email")
        writtenToken = request.data.get("token")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)
        otp = OTP.objects.get(userID=user.id)
        realToken = otp.token

        if realToken != writtenToken:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if otp.createdTime + datetime.timedelta(minutes=5) < timezone.now():
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)

        self.serializer_class = LoginSerializer
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
