"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet

from courses import views as cViews
from user import views as uViews

router = routers.DefaultRouter()
# AUTHENTICATION
# router.register(r'auth/login', LoginViewSet, basename='auth-login')
# router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
# router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

router.register(r'courses', cViews.CoursesViewSet, basename="course")
router.register(r'courseVideo', cViews.CoursesVideoViewSet, basename="video")
router.register(r'subscription', cViews.SubscriptionViewSet, basename="subscription")
router.register(r'User', uViews.UserViewSet, basename="user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
