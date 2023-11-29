from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('post', view=views.post, name="post"),
]
