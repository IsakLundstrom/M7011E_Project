from django.db import models
from django.utils import timezone


# Create your models here.

class Courses(models.Model):
    courseID = models.AutoField(auto_created=True, primary_key=True)
    courseName = models.TextField(max_length=32, blank=False)
    shortDescription = models.TextField(max_length=80, default=courseName)
    longDescription = models.TextField(max_length=2000, default=shortDescription)
    courseIMG = models.ImageField(upload_to='courses')
    owner = models.ForeignKey('user.User', on_delete=models.CASCADE)
    likeRatio = models.IntegerField(default=0)
    createDate = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['courseID']

    def __str__(self):
        return f"{self.courseName}"


class CoursesVideos(models.Model):
    videoID = models.AutoField(auto_created=True, primary_key=True)
    courseID = models.ForeignKey("Courses", on_delete=models.CASCADE, to_field="courseID")
    videoName = models.CharField(max_length=64, blank=False)
    videoURL = models.URLField(blank=False)

    class Meta:
        ordering = ['courseID']


class Subscription(models.Model):
    subID = models.AutoField(auto_created=True, primary_key=True)
    courseID = models.ForeignKey("Courses", on_delete=models.CASCADE, to_field="courseID")
    userID = models.ForeignKey("user.User", on_delete=models.CASCADE, to_field="id")

    class Meta:
        constraints = [
            models.constraints.UniqueConstraint(fields=['courseID', 'userID'], name='uniqueSub')
        ]
        ordering = ['courseID']


class Like(models.Model):
    likeID = models.AutoField(auto_created=True, primary_key=True)
    courseID = models.ForeignKey("Courses", on_delete=models.CASCADE, to_field="courseID")
    userID = models.ForeignKey("user.User", on_delete=models.CASCADE, to_field="id")

    class Likes(models.IntegerChoices):
        undefined = -1
        dislike = 0
        like = 1

    like = models.IntegerField(choices=Likes.choices, default=-1)

    class Meta:
        constraints = [
            models.constraints.UniqueConstraint(fields=['courseID', 'userID'], name='uniqueLike')
        ]
        ordering = ['courseID']
