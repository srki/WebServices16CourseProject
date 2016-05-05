import json

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View
from WS16_2012.models import Task, Project

from django.core.paginator import Paginator


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

        data = [model_to_dict(instance) for instance in tasks]
        return JsonResponse({'tasks': data, 'count': count}, status=200)


class ProjectsTasksView(View):

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
