import json
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import  loader
from serializer import user_serializer
from models import *
import uuid
import pdb

def index(request):
      templates = loader.get_template('index.html')
      return HttpResponse(templates.render())

def login_user(request):
      response_data = {}
      if request.method == 'POST':
            user_name = request.POST['user']
            users = User.objects.filter(name=user_name)
            if not users:
                  response_data["status"] = "UserNotExist"
                  return HttpResponse(json.dumps(response_data), content_type="application/json")
            else:
                  token = str(uuid.uuid1())
                  user = users[0]
                  token_instance = Token.objects.create(user=user,token=token)
                  token_instance.save()
                  response_data["status"] = "OK"
                  response_data["token"] = token
                  return HttpResponse(json.dumps(response_data), content_type="application/json")


def get_user(request):
      response_data = {}
      if request.method == 'POST':
          token = request.POST['token']
          tokens = Token.objects.filter(token=token)
          if not tokens:
                  response_data["status"] = "UserNotExist"
                  return JsonResponse(response_data, safe=False)
          else:
                  user = tokens[0].user
                  response_data["status"] = "OK"
                  logedin_user = user_serializer(user)
                  response_data["user"] = logedin_user
                  users = User.objects.all()
                  users_list = map(user_serializer, list(users))
                  response_data["follow_by_user"] = mark_follow_by_user(users_list, logedin_user)
                  return JsonResponse(response_data, safe=False)

      if request.method == 'GET':
          users = User.objects.all()
          response_data["status"] = "OK"
          users_list = map(user_serializer,list(users))
          response_data["users"] = users_list
          return JsonResponse(response_data, safe=False)




def follow(request):
      response_data = {}
      if request.method == 'POST':
          target = request.POST['target']
          source = request.POST['source']
          next_state = request.POST['nextState']
          print target #johhny
          print source #lior
          print next_state
          user_target = User.objects.filter(name=target).first()
          user_source = User.objects.filter(name=source).first()
          is_follow = True
          if next_state == "follow":
              user_target.follows.add(user_source)
              user_target.followers_number += 1
          else:
              user_target.follows.remove(user_source)
              user_target.followers_number -= 1
              is_follow =False

          user_target.save()
          user_source = User.objects.filter(name=source).first()
          serialized_user_source = user_serializer(user_source)
          serialized_user_target = user_serializer(user_target)
          return_user = serialized_user_target
          return_user["follows"].append(serialized_user_source)
          response_data["status"] = "OK"
          response_data["target"] = serialized_user_target
          response_data["source"] = serialized_user_source
          response_data["isFollow"] = is_follow
          response_data["user"] = return_user
          return JsonResponse(response_data, safe=False)


def mark_follow_by_user(all_users, logedin_user):
    all_users.remove(logedin_user)
    for user in all_users:
        user["isfollow"] = False
        for follow in  user['follows']:
            if logedin_user['name'] == follow["name"]:
                user["isfollow"] = True
    return all_users

