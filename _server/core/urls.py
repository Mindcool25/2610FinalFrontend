from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('newpost', view=views.new_post, name="new post"),
    path('getpost/<int:id>/', views.GetPost.as_view()),
    path('images', view=views.new_image, name="images"),
    path('images/<int:id>/', view=views.get_image),
    path('newtopic', view=views.new_topic, name="new topic"),
    path('gettopic/<int:id>/', view=views.get_topic, name="get topic"),
    path('gettopics', view=views.get_topics),
    #path('user/<int:id>/', view=views.GetUser.as_view()),
]
