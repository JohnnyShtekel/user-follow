from __future__ import unicode_literals

from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return str(self.name)

class User(models.Model):
    name = models.CharField(max_length=50)
    follows = models.ManyToManyField('self', related_name='follow', symmetrical=False, blank=True)
    followers_number = models.IntegerField(default=0)
    group = models.ManyToManyField(Group, blank=True,related_name='group')

    def __unicode__(self):
        return str(self.name)

    def get_follow_number(self):
        return self.followers_number


class Token(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=200)
