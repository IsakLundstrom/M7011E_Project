from rest_framework import serializers

from .models import Courses, CoursesVideos


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ["courseID", "courseName", "shortDescription", "longDescription", "likeRatio"]


class CoursesVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesVideos
        fields = ["videoID", "courseID", "videoURL"]
