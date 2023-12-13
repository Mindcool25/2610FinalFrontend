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

class NewPost(View):
    # TODO: Add topic stuff from front end
    def post(self, req):
        new = models.Post()
        data = json.loads(req.body.decode("utf-8"))
        try:
            new.user = req.user
            new.topic = None
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
        return

def jsonPost(post):
    return {
            "id": post.id,
            "user": post.user.first_name,
            "topic": post.topic,
            "title": post.title,
            "content": post.content,
            }
