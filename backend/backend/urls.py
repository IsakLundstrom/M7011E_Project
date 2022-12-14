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
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_extensions.routers import ExtendedSimpleRouter

from .auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet, OTPVerify
from courses import views as cViews
from user import views as uViews

router = ExtendedSimpleRouter()
# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

courseRouter = router.register(r'courses', cViews.CoursesViewSet, basename="course")
courseRouter.register(r'videos', cViews.CoursesVideoViewSet, basename="courses-video", parents_query_lookups=['courseID'])
courseRouter.register(r'likes', cViews.LikeViewSet, basename="courses-like", parents_query_lookups=['courseID'])
courseRouter.register(r'subscriptions', cViews.SubscriptionViewSet, basename="courses-subscription", parents_query_lookups=['courseID'])

router.register(r'user', uViews.UserViewSet, basename="user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('auth/resetPassword/', uViews.ResetPasswordView.as_view(), name="resetPassword"),
    path('auth/resetPasswordConfirm/', uViews.ResetPasswordConfirmView.as_view(), name="resetPasswordConfirm"),
    path('auth/login/2fa', OTPVerify.as_view(), name="OTPVerify"),
    path('subscriptions/', cViews.UserSubscriptions.as_view(), name="userSubscriptions"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
