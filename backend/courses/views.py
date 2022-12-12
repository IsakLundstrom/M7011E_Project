from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework import permissions
from rest_framework import filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CoursesSerializer, CoursesVideosSerializer, SubscriptionSerializer, LikeSerializer
from .models import Courses, CoursesVideos, Subscription, Like
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
    filterset_fields = ['userID', 'courseID']

    # def retrieve(self, request):
    #     print("re")
    #     print(request.resolver_match)
    #     queryset = Courses.objects.all()
    #
    def list(self, request):
        # print("list")
        user = request.query_params.get("userID")
        # print(user)
        if user is None:
            return super().list(self, request)

        subs = Subscription.objects.all().filter(userID=int(user))

        course = request.query_params.get("courseID")
        if course is not None:
            subs = subs.filter(courseID = int(course))

        courses = []
        for sub in subs:
            courses.append(sub.courseID)
        courseSerializer = CoursesSerializer(courses, many=True)
        subSerializer = SubscriptionSerializer(subs, many=True)
        # return Response(courseSerializer.data)
        return Response({"courses": courseSerializer.data,
                         "subscription": subSerializer.data})


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    http_method_names = ['get', 'put', 'delete', 'post']
    filterset_fields = ['userID']
