from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend.user import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'User', views.UserViewSet, basename="user")

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path("changePassword/", views.ChangePasswordView.as_view(), name="changePassword"),
    path('^courseVideo/(?P<id>.+)/$', views.CourseVideoView.as_view(), name="courseVideo"),
]
