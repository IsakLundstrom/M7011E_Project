from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator

from .models import User
from .serializers import UserSerializer, ChangePasswordSerializer, ResetPasswordSerializer, \
    ResetPasswordConfirmSerializer
from .permissions import IsUserPermission
from backend import send_mail


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserPermission,)
    http_method_names = ['get', 'put', 'delete', 'patch']

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        requestPassword = request.data.get("password")

        if requestPassword is not None:
            serializedPassword = serializer.data.get("password")
            instance.set_password(serializedPassword)
            instance.save()

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)




# class ChangePasswordView(generics.UpdateAPIView):
#     serializer_class = ChangePasswordSerializer
#     model = User
#     permission_classes = (IsAuthenticated,)
#
#     def get_object(self, queryset=None):
#         obj = self.request.user
#         return obj
#
#     def update(self, request, *args, **kwargs):
#         self.object = self.get_object()
#         serializer = self.get_serializer(data=request.data)
#
#         if serializer.is_valid():
#             self.object.set_password(serializer.data.get("newPassword"))
#             self.object.save()
#
#             return Response(serializer.data, status=status.HTTP_200_OK)


class ResetPasswordView(generics.CreateAPIView):
    serializer_class = ResetPasswordSerializer
    model = User

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get("email")
            port = serializer.data.get("port")
            try:
                user = User.objects.get(email=email)
            except:
                return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)
            token = default_token_generator.make_token(user)

            send_mail.send_mail(
                html="<p>Here is your password reset link</p><h1>http://localhost:" + port + "/resetPasswordConfirm/" + str(user.id) + "/" + token + "/</h1>",
                subject='The Sweat Zone: Password reset',
                from_email='sweatzone1337@gmail.com',
                to_emails=[email])

            return Response(serializer.data, status=status.HTTP_200_OK)


class ResetPasswordConfirmView(generics.CreateAPIView):
    serializer_class = ResetPasswordConfirmSerializer
    model = User

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            userID = serializer.data.get("uID")
            token = serializer.data.get("token")
            password = serializer.data.get("password")

            try:
                user = User.objects.get(id=userID)
            except:
                return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)

            if not default_token_generator.check_token(user, token):
                return Response(status=status.HTTP_403_FORBIDDEN)

            user.set_password(password)
            user.save()

            return Response(status=status.HTTP_200_OK)
