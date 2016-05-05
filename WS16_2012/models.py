from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=2000)
    participants = models.ManyToManyField(User)


class Task(models.Model):
    name = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    priority = models.CharField(max_length=30)
    description = models.CharField(max_length=2000)

    project = models.ForeignKey(Project)
    created = models.ForeignKey(User, related_name='created')
    assigned = models.ForeignKey(User, related_name='assigned', null=True)


class Comment(models.Model):
    text = models.CharField(max_length=2000)
    date = models.DateTimeField()

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created = models.ForeignKey(User)


class TaskRevision(models.Model):
    name = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    priority = models.CharField(max_length=30)
    description = models.CharField(max_length=2000)
    date = models.DateTimeField()

    assigned = models.ForeignKey(User, null=True)

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
