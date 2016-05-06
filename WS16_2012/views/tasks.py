import json

from datetime import datetime

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View
from WS16_2012.models import Task, TaskRevision, Project

from django.core.paginator import Paginator
from django.contrib.auth.models import User

from django.db import transaction


class TasksView(RestView):

    @staticmethod
    def get_stats(values):
        stats = [value.upper() for value in values.split(',')]
        for value in stats:
            if value not in ['TO DO', 'IN PROGRESS', 'VERIFY', 'DONE']:
                raise ValueError
        return stats

    @staticmethod
    def get_priority(values):
        prior = [value.upper() for value in values.split(',')]
        for value in prior:
            if value not in ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL']:
                raise ValueError
        return prior

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def rest_get(self, request):

        tasks = Task.objects.all()

        if 'status' in request.GET:
            stats = self.get_stats(request.GET['status'])
            tasks = tasks.filter(status__in=stats)

        if 'priority' in request.GET:
            prior = self.get_priority(request.GET['priority'])
            tasks = tasks.filter(priority__in=prior)

        count = tasks.count()

        if 'per_page' in request.GET and 'page' in request.GET:
            per_page = request.GET['per_page']
            page = request.GET['page']

            paginator = Paginator(tasks, per_page)
            tasks = paginator.page(page)

        data = []
        for instance in tasks:
            t = model_to_dict(instance)
            t['project'] = model_to_dict(instance.project, fields=['id', 'name'])
            data.append(t)

        return JsonResponse({'tasks': data, 'count': count}, status=200)


class ProjectTasksView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, identifier):

        try:
            project = Project.objects.get(id=identifier)
            tasks = project.task_set.all()

            count = tasks.count()

            if 'per_page' in request.GET and 'page' in request.GET:
                per_page = request.GET['per_page']
                page = request.GET['page']

                paginator = Paginator(tasks, per_page)
                tasks = paginator.page(page)

            data = [model_to_dict(instance) for instance in tasks]
            return JsonResponse({'tasks': data, 'count': count}, status=200)
        except Exception:
            return JsonResponse({'message': 'Bad request'}, status=400)

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    @method_decorator(transaction.atomic)
    def post(self, request, identifier):
        try:
            project = Project.objects.get(id=identifier)
            project.task_id += 1
            project.save()

            creator = request.user
            values = json.loads(request.body)

            if values['status'].upper() not in ['TO DO', 'IN PROGRESS', 'VERIFY', 'DONE']:
                raise ValueError

            if values['priority'].upper() not in ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL']:
                raise ValueError

            task = Task(code=project.name + '-' + str(project.task_id),
                        subject=values['subject'],
                        status=values['status'],
                        priority=values['priority'],
                        description=values['description'])

            task.project = project
            task.created = creator

            if 'assigned' in values:
                task.assigned = User.objects.get(id=values['assigned'])

            task.save()

            return JsonResponse({}, status=200)

        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)


class ProjectTaskView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id, task_id):

        try:
            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)

            data = model_to_dict(task)
            return JsonResponse(data, status=200)
        except Exception:
            return JsonResponse({'message': 'Bad request'}, status=400)

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    @method_decorator(transaction.atomic)
    def put(self, request, project_id, task_id):

        try:
            p = Project.objects.get(id=project_id)
            t = p.task_set.get(id=task_id)

            tr = TaskRevision(subject=t.subject,
                              status=t.status,
                              priority=t.priority,
                              description=t.description,
                              date=datetime.now(),
                              assigned=t.assigned,
                              task=t)
            tr.save()

            values = json.loads(request.body)

            if values['status'].upper() not in ['TO DO', 'IN PROGRESS', 'VERIFY', 'DONE']:
                raise ValueError

            if values['priority'].upper() not in ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL']:
                raise ValueError

            t.subject = values['subject']
            t.status = values['status']
            t.priority = values['priority']
            t.description = values['description']

            t.assigned = User.objects.get(id=values['assigned'])

            t.save()

            return JsonResponse({}, status=200)

        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def delete(self, request, project_id, task_id):

        try:
            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)

            task.delete()
            return JsonResponse({}, status=200)
        except Exception:
            return JsonResponse({'message': 'Bad request'}, status=400)


class ProjectTaskHistoryView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id, task_id):

        try:
            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)
            history = task.taskrevision_set.all().order_by('date')

            count = history.count()

            if 'per_page' in request.GET and 'page' in request.GET:
                per_page = request.GET['per_page']
                page = request.GET['page']

                paginator = Paginator(history, per_page)
                history = paginator.page(page)

            data = [model_to_dict(instance) for instance in history]

            return JsonResponse({'changes': data, 'count': count}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)