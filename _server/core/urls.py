from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('newpost', view=views.NewPost.as_view(), name="new post"),
    #path('getpost/<int:id>/', views.GetPost.as_view()),
    #path('images', view=views.Images.as_view(), name="images"),
    #path('images/<int:id>/', views.GetImage.as_view()),
    #path('topic', view=views.Topic.as_view(), name="topic"),
    #path('topic/<int:id>/', view=views.GetTopic.as_view()),
    #path('user/<int:id>/', view=views.GetUser.as_view()),
]
