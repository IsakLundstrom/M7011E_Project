from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CoursesSerializer
from .models import Courses


# Create your views here.
class CoursesViewSet(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
