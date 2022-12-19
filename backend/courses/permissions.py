from rest_framework import permissions

from .models import Courses


class IsCoursePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method != 'POST' or request.user.is_staff or request.user.groups.filter(name="Author"):
            return True

        return False

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True

        return obj.owner == request.user


class IsVideoPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True

        cID = request.resolver_match.kwargs.get("parent_lookup_courseID")
        owner = Courses.objects.all().get(courseID=cID).owner
        if str(request.user.email) == str(owner) and request.user.is_staff:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True

        return obj.owner == request.user
