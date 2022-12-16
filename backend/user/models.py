from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


# Create your models here.
class UserManager(BaseUserManager):

    def createUser(self, fName, lName, email, password=None, **Kwargs):
        if fName is None or lName is None:
            raise TypeError("You need to have both a first name and a last name")

        if email is None:
            raise TypeError("Email pls")

        user = self.model(email=self.normalize_email(email), fName=fName, lName=lName)
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    fName = models.CharField(max_length=100)
    lName = models.CharField(max_length=100)
    userIMG = models.ImageField(upload_to="users", default="default/default_profile.png")
    has2FA = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"


class OTP(models.Model):
    userID = models.ForeignKey('user.User', on_delete=models.CASCADE)
    token = models.CharField(max_length=6)
    createdTime = models.DateTimeField(auto_now=True)
