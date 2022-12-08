from rest_framework import permissions


class IsCoursePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method != 'POST' or request.user.is_staff or request.user.groups.filter(name="Author"):
            return True

        return False

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS or request.user.is_staff:
            return True

        return obj.owner == request.user

# class IsAuthor(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
