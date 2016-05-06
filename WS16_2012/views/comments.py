import json

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View
from WS16_2012.models import Project

from django.core.paginator import Paginator


class CommentsView(View):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id, task_id):

        try:
            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)
            comments = task.comment_set.all()
            count = comments.count()

            if 'per_page' in request.GET and 'page' in request.GET:
                per_page = request.GET['per_page']
                page = request.GET['page']

                paginator = Paginator(comments, per_page)
                comments = paginator.page(page)

            data = [model_to_dict(instance) for instance in comments]
            return JsonResponse({'comments': data, 'count': count}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)