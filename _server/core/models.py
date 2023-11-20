from django.db import models

class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete.CASCADE)
    title = models.TextField()
    content = models.TextField()

class Reply(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete.CASCADE)
    post = models.ForeignKey(Post, on_delete.CASCADE)
    replyParent = models.ForeignKey(Reply, on_delete.CASCADE)
    content = models.TextField()
