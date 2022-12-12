from functools import partial

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework_extensions.mixins import NestedViewSetMixin
from rest_framework import permissions
from rest_framework import filters, status
from rest_framework.response import Response
from django.http import HttpResponseNotFound
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

    def retrieve(self, request, *args, **kwargs):
        courseID = int(kwargs.get("pk"))
        likesObjects = Like.objects.all().filter(courseID=courseID)
        print(request.data)

        likes = 0
        dislikes = 0
        undefined = 0
        likeRatio = 0
        for like in likesObjects:
            if like.like == 1:
                likes += 1
            elif like.like == 0:
                dislikes += 1
            else:
                undefined += 1
        if likes + dislikes == 0:
            likeRatio = 0
        else:
            likeRatio = likes / (likes + dislikes) * 100

        instance = self.get_object()
        instance.likeRatio = likeRatio

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class CoursesVideoViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CoursesVideos.objects.all()
    serializer_class = CoursesVideosSerializer
    filterset_fields = ['courseID']
    permission_classes = [IsVideoPermission]


class SubscriptionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    http_method_names = ['get', 'put', 'delete', 'post']
    filterset_fields = ['userID', 'courseID']

    def retrieve(self, request, *args, **kwargs):
        courseID = kwargs.get("parent_lookup_courseID")
        userID = kwargs.get("pk")
        sub = Subscription.objects.all().filter(userID=int(userID), courseID=int(courseID))
        if len(sub) != 1:
            return Response(status=status.HTTP_404_NOT_FOUND)
        subSerializer = SubscriptionSerializer(sub[0])
        return Response(subSerializer.data)

    # def list(self, request, *args, **kwargs):
    #     # print("list")
    #     user = request.query_params.get("userID")
    #     # courseID = kwargs.get("parent_lookup_courseID")
    #     # print(user)
    #     if user is None:
    #         return super().list(self, request)
    #
    #     subs = Subscription.objects.all().filter(userID=int(user))
    #
    #     course = request.query_params.get("courseID")
    #     if course is not None:
    #         subs = subs.filter(courseID = int(course))
    #
    #     courses = []
    #     for sub in subs:
    #         courses.append(sub.courseID)
    #     # courseSerializer = CoursesSerializer(courses, many=True)
    #     subSerializer = SubscriptionSerializer(subs, many=True)
    #     return Response(subSerializer.data)
    #     # return Response({"courses": courseSerializer.data,
    #     #                  "subscription": subSerializer.data})


class UserSubscriptions(generics.ListAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesVideosSerializer

    def get(self, request, *args, **kwargs):
        try:
            subs = Subscription.objects.all().filter(userID=int(request.user.userID))
        except:
            return Response(status.HTTP_404_NOT_FOUND)

        courses = Courses.objects.all()
        subCourses = []
        for sub in subs:
            subCourses.append(courses.get(courseID=sub.courseID))

        self.queryset = subCourses
        super().get(self, request, args, kwargs)


class LikeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    http_method_names = ['get', 'put', 'delete', 'post']
    filterset_fields = ['userID']

    def retrieve(self, request, *args, **kwargs):
        courseID = kwargs.get("parent_lookup_courseID")
        userID = kwargs.get("pk")
        sub = Like.objects.all().filter(userID=int(userID), courseID=int(courseID))
        if len(sub) != 1:
            return Response(status=status.HTTP_404_NOT_FOUND)
        likeSerializer = LikeSerializer(sub[0])
        return Response(likeSerializer.data)
