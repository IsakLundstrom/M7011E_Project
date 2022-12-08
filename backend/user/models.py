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
    email = models.EmailField(unique=True)
    fName = models.CharField(max_length=100)
    lName = models.CharField(max_length=100)

    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
