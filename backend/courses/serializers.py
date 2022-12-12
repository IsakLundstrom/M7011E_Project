from rest_framework import serializers

from .models import Courses, CoursesVideos, Subscription, Like


class CoursesSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Courses
        fields = ["courseID", "courseName", "shortDescription", "longDescription", "courseIMG", "likeRatio",
                  "createDate", "owner"]


class CoursesVideosSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesVideos
        fields = ["videoID", "courseID", "videoName", "videoURL"]


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["subID", "courseID", "userID"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["likeID", "courseID", "userID", "like"]
