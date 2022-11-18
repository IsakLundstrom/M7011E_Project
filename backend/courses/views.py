from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CoursesSerializer, CoursesVideosSerializer
from .models import Courses, CoursesVideos


# Create your views here.
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer


class CoursesVideoViewSet(viewsets.ModelViewSet):
    queryset = CoursesVideos.objects.all()
    serializer_class = CoursesVideosSerializer
