from django.views import View
from django.shortcuts import render
from django.conf  import settings
from django.http import HttpResponse
from django.http import JsonResponse
import json
import os
from django.contrib.auth.decorators import login_required
from . import models

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

class Post(View):
    # Get an amount of posts
    def get(self, request):
        posts = Post.objects.filter().order_by('-date')[0::10]
        ret = {"posts":[]}
        for post in posts:
            temp = {}
            temp["user"] = request.user
            temp["topic"] = post.topic
            temp["content"] = post.content
            temp["parent"] = post.parent
            ret["posts"].append(temp)
        return JsonResponse(ret)
    # Create a new post
    @login_required
    def post(self, request):
        newpost = models.Post
        data = json.load(request.body.decode("utf-8"))
        try:
            newpost.user = request.user
            newpost.topic = data.get("topic") # Probably get this dynamically
            newpost.title = data.get("title")
            newpost.content = data.get("content")
            newpost.parent = data.get("parent") # Probably need to get this dynamically
            newpost.save()
            return
        except:
            return HttpResponse("Bad data")

class GetPost(View):
    # Get given post
    def get(self, request, id):
        return
    # Edit given post (If correct user)
    @login_required
    def post(self, request, id):
        return

class GetImage(View):
    # Get given image 
    def get(self, request):
        return
    @login_required
    # Remove given image (if logged in)
    def post(self, request):
        return

class Topic(View):
    # Return all topics
    def get(self, request):
        return
    # Create a new topic
    @login_required
    def post(self, request):
        newTopic = models.Topic
        data = json.load(request.body.decode("utf-8"))
        try:
            newTopic.title = data.get("title")
            newTopic.description = data.get("description")
            newTopic.save()
            return
        except:
            return HttpResponse("Bad data")

class GetTopic(View):
    # Return given topic
    def get(self, request):
        return
    # Edit given topic (If logged in)
    @login_required
    def post(self, request):
        return

class GetUser(View):
    def get(self, request, id):
        return
    def post(self, request):
        return

class Images(View):
    # Get an image
    def get(self, request):
        return
    # Save an image
    @login_required
    def post(self, request):
        return
