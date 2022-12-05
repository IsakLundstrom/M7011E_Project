from rest_framework import serializers

from .models import Courses, CoursesVideos, Subscription


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ["courseID", "courseName", "shortDescription", "longDescription", "courseIMG"]


class CoursesVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesVideos
        fields = ["videoID", "courseID", "videoURL"]


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["courseID", "userID", "like"]
