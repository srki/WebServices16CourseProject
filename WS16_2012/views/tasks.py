import json

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View
from WS16_2012.models import Task, Project

from django.core.paginator import Paginator
from django.contrib.auth.models import User


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
    def post(self, request, identifier):
        try:
            project = Project.objects.get(id=identifier)
            creator = request.user

            task_count = project.task_set.all().count()
            values = json.loads(request.body)

            task = Task(name=project.name + '-' + str(task_count),
                        status=values['status'],
                        priority=values['priority'],
                        description=values['description'])

            task.project = project
            task.created = creator

            if 'assigned' in values:
                task.assigned = User.objects.get(id=values['assigned'])

            task.save()

            return JsonResponse({}, status=200)

        except Exception:
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