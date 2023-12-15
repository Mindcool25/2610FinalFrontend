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

@login_required
def new_post(req):
    new = models.Post()
    data = json.loads(req.body.decode("utf-8"))
    try:
        new.user = req.user
        new.topic = models.Topic.objects.filter(id=data.get("topic"))[0]
        new.title = data.get("title")
        new.content = data.get("content")
        if "parent" in data.keys():
            new.parent = models.Post.objects.filter(id=data.get("parent"))[0]
        else:
            new.parent = None
        new.save()
        return JsonResponse({"message":"Success"})
    except:
        return JsonResponse({"message":"Failed"})

# TODO: Reformat this
class GetPost(View):
    def get(self, req, id):
        ret = {"posts":[]}
        try:
            post = models.Post.objects.filter(id=id)[0]
            for i in range(10):
                ret["posts"].append(jsonPost(post))
                if hasattr(post, "post"):
                    post = post.post
                else:
                    return JsonResponse(ret)
            return JsonResponse(ret)
        except Exception as e:
            return JsonResponse({"message":str(e)})

def jsonPost(post):
    if post == None:
        print("NO POST :(")
    print(post)

    return {
            "id": post.id,
            "user": post.user.username,
            "topic": post.topic.title,
            "title": post.title,
            "content": post.content,}

@login_required
def new_topic(req):
    if req.method != "post":
        return JsonResponse({"message":"Failed"})
    new = models.Topic()
    data = json.loads(req.body.decode("utf-8"))
    try:
        new.title = data.get("title")
        new.description = data.get("description")
        new.save()
        return JsonResponse({"message":"Success"})
    except Exception as e:
        return JsonResponse({"message":str(e)})

def get_topic(req, id):
    ret = {"title":"", "description":"", "posts":[]}
    topic = models.Topic.objects.filter(id=id)[0]
    ret["title"] = topic.title
    ret["description"] = topic.description
    posts = models.Post.objects.select_related().filter(topic=topic)
    for post in posts:
        if post.parent == None:
            ret["posts"].append(jsonPost(post))
    return JsonResponse(ret)


def get_topics(req):
    topics = models.Topic.objects.all()
    ret = {"topics":[]}
    for topic in topics:
        ret["topics"].append({
            "title": topic.title,
            "description": topic.description
            })
    return JsonResponse(ret)

def new_image(req):
    if req.method != "post":
        return JsonResponse({"message":"Failed"})
    data = req.data
    new = models.Image()
    new.post = data.Post.objects.filter(id=data["post"])
    new.image = request.FILES.get('image')
    new.save()
    return JsonResponse({"message":"Success"})

def get_image(req, id):
    image = models.Image.objects.filter(id=id)
    ret = {"path":image.path,"width":image.width,"height":image.height}
    return JsonResponse(ret)
