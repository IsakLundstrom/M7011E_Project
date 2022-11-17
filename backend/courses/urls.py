from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from backend.courses import views

urlpatterns = [
    path('courses/', views.CoursesViewSet),
]

urlpatterns = format_suffix_patterns(urlpatterns)
