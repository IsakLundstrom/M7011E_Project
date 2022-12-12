from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework import permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CoursesSerializer, CoursesVideosSerializer, SubscriptionSerializer
from .models import Courses, CoursesVideos, Subscription
from .permissions import IsCoursePermission, IsVideoPermission


# Create your views here.
class CoursesViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [IsCoursePermission]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["owner"]
    search_fields = ["courseName", "shortDescription", "longDescription"]
    ordering_fields = ['courseName', 'courseID', 'owner', 'likeRatio']
    ordering = ['courseID']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CoursesVideoViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CoursesVideos.objects.all()
    serializer_class = CoursesVideosSerializer
    filterset_fields = ['courseID']
    permission_classes = [IsVideoPermission]


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    http_method_names = ['get', 'put', 'delete', 'post']
    filterset_fields = ['userID']
