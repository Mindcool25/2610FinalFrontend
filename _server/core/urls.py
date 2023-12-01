from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    #path('post', view=views.post, name="post"),
    #path('images', view=views.images, name="images"),
    #path('topic', view=views.topic, name="topic"),
]
