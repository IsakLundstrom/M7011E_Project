from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework import permissions
from .serializers import CoursesSerializer, CoursesVideosSerializer, SubscriptionSerializer
from .models import Courses, CoursesVideos, Subscription
from .permissions import IsCoursePermission


# Create your views here.
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [IsCoursePermission]
    #permission_required = ("courses.add_courses", "courses.change_courses", "courses.delete_courses",)

    # def get_permissions(self):
    #     # if self.action == 'create':
    #     #     composed_perm = IsCoursePermission
    #     #     return [composed_perm()]
    #     #
    #     # return super().get_permissions()
    #     return [IsCoursePermission]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CoursesVideoViewSet(viewsets.ModelViewSet):
    queryset = CoursesVideos.objects.all()
    serializer_class = CoursesVideosSerializer


class CourseVideoView(generics.ListAPIView):
    serializer_class = CoursesVideosSerializer

    def get_queryset(self):
        cid = self.kwargs['id']
        if cid == {}:
            return CoursesVideos.objects.all()
        return CoursesVideos.objects.filter(courseID=cid)


class SubscriptionView(generics.ListAPIView):
    serializer_class = SubscriptionSerializer

    def get_queryset(self):
        cid = self.kwargs['id']

        if cid == {}:
            return Subscription.objects.all()
        return Subscription.objects.filter(courseID=cid)


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    http_method_names = ['get', 'put', 'delete', 'post']
