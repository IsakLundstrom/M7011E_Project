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
        print("has")
        param = request.query_params
        print(param)
        cID = param.get("courseID")
        print(cID, type(cID))
        # try:
        owner = Courses.objects.all().get(courseID = cID).owner
        # except:
        #     print("ERROR")
        #     owner = Courses.objects.all().get(courseID=cID).owner
        print(owner)

        if request.method != 'POST' or (request.user.is_staff):
            return True

        return False

    def has_object_permission(self, request, view, obj):
        print("has_object")

        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True

        return obj.owner == request.user
