from rest_framework import permissions


class IsUserPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        print("has_object")

        return obj == request.user or request.user.is_superuser
