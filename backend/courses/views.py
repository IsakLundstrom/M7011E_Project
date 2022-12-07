from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import CoursesSerializer, CoursesVideosSerializer, SubscriptionSerializer
from .models import Courses, CoursesVideos, Subscription


# Create your views here.
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer


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
