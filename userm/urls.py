from django.conf.urls import url
from . import views

urlpatterns = [
    url('home', views.index, name='index'),
    url('login', views.login_user, name='login_user'),
    url('user', views.get_user, name='user'),
    url('follow', views.follow, name='follow'),
    # url('unfollow', views.unfollow, name='unfollow'),
]