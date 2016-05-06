import json
from django.views.generic import View
from django.http import JsonResponse


class PrivilegeCheck:

    def __init__(self):
        pass

    @staticmethod
    def is_on_project(project, user):
        project.participants.get(id=user.id)

    @staticmethod
    def can_edit_tasks_project(project, user):

        if user.has_perm('auth.admin'):
            return

        project.participants.get(id=user.id)

    @staticmethod
    def can_edit_comment(project, user):

        if user.has_perm('auth.admin'):
            return

        project.participants.get(id=user.id)


class RestView(View):
    def get(self, request):
        try:
            return self.rest_get(request)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)

    def post(self, request):

        try:
            json_values = json.loads(request.body)
            return self.rest_post(request, json_values)

        except ValueError as e:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)

    def rest_get(self, request):
        pass

    def rest_post(self, request, json_values):
        pass
