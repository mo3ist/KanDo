from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    pass

class Kanban(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Todo(models.Model):
    name = models.CharField(max_length=500)
    kanban = models.ForeignKey(Kanban, on_delete=models.CASCADE)