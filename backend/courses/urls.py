from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from backend.courses import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'courses', views.CoursesViewSet, basename="course")
router.register(r'courseVideo', views.CoursesVideoViewSet, basename="video")
router.register(r'subscription', views.SubscriptionViewSet, basename="subscription")

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
