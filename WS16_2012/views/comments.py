import json
from datetime import datetime

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View, PrivilegeCheck
from WS16_2012.models import Project, Comment

from django.core.paginator import Paginator


class CommentsView(View):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id, task_id):

        try:

            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)
            comments = task.comment_set.all()
            count = comments.count()

            PrivilegeCheck.can_access_project(project, request.user)

            if 'per_page' in request.GET and 'page' in request.GET:
                per_page = request.GET['per_page']
                page = request.GET['page']

                paginator = Paginator(comments, per_page)

                page = min(int(page), paginator.num_pages)
                comments = paginator.page(page)

            data = []
            for instance in comments:
                c = model_to_dict(instance)
                c['created'] = model_to_dict(instance.created, fields=['username', 'id'])

                data.append(c)

            return JsonResponse({'comments': data, 'count': count}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def post(self, request, project_id, task_id):

        try:
            values = json.loads(request.body)
            project = Project.objects.get(id=project_id)

            PrivilegeCheck.can_access_project(project, request.user)

            t = project.task_set.get(id=task_id)
            c = Comment(text=values['text'],
                        date=datetime.now(),
                        task=t,
                        created=request.user)

            c.save()

            return JsonResponse({}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)


class CommentView(View):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def delete(self, request, project_id, task_id, comment_id):

        try:
            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)
            comment = task.comment_set.get(id=comment_id)
            PrivilegeCheck.can_edit_comment(comment, request.user)

            comment.delete()

            return JsonResponse({}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def put(self, request, project_id, task_id, comment_id):

        try:
            values = json.loads(request.body)

            project = Project.objects.get(id=project_id)
            task = project.task_set.get(id=task_id)
            comment = task.comment_set.get(id=comment_id)
            PrivilegeCheck.can_edit_comment(comment, request.user)

            comment.text = values['text']
            comment.save()

            return JsonResponse({}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)