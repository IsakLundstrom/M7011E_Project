from django.db import models


# Create your models here.

class Courses(models.Model):
    courseID = models.AutoField(auto_created=True, primary_key=True)
    courseName = models.TextField(max_length=32, blank=False)
    shortDescription = models.TextField(max_length=80, default=courseName)
    longDescription = models.TextField(max_length=2000, default=shortDescription)
    courseIMG = models.URLField(default="https://cdn.discordapp.com/attachments/230245539520708608"
                                        "/1049264539629277194/image.png")
    likeRatio = models.IntegerField(default=-1)

    class Meta:
        ordering = ['courseID']

    def __str__(self):
        return f"{self.courseName}"


class CoursesVideos(models.Model):
    videoID = models.AutoField(auto_created=True, primary_key=True)
    courseID = models.ForeignKey("Courses", on_delete=models.CASCADE, to_field="courseID")
    videoURL = models.URLField(blank=False)

    class Meta:
        ordering = ['videoID']


class Subscription(models.Model):
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
