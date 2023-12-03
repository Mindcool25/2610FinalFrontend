from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    #path('post', view=views.post, name="post"),
    #path('post/<int:id>/", views.GetPost.as_view()),
    #path('images', view=views.images, name="images"),
    #path('images/<int:id>/", views.GetImage.as_view()),
    #path('topic', view=views.topic, name="topic"),
    #path('topic/<int:id>/', view=views.GetTopic.as_view()),
]
