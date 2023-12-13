from django.db import models
from django.contrib.auth.models import User


class Topic(models.Model):
    title = models.TextField()
    description = models.TextField()

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE,default=None)
    title = models.TextField()
    content = models.TextField()
    parent = models.OneToOneField('self', on_delete=models.CASCADE, default=None)

class Image(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.ImageField(upload_to="images")
