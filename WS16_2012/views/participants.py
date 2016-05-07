import json

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import View, PrivilegeCheck
from WS16_2012.models import Project
from django.contrib.auth.models import User

from django.core.paginator import Paginator


class AddParticipantsView(View):
    @method_decorator(permission_required(perm='auth.admin', raise_exception=True))
    def post(self, request, identifier):
        project = Project.objects.get(id=int(identifier))

        if not project:
            return JsonResponse({'message': 'Not found'}, status=404)

        try:
            values = json.loads(request.body)

            if 'userId' not in values:
                return JsonResponse({'message': 'Bad request!'}, status=400)

            u = User.objects.get(id=values['userId'])
            project.participants.add(u)
            project.save()

            return JsonResponse({}, status=200)
        except ValueError:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)
        except Exception as e:
            return JsonResponse({'message': 'Bad request!'}, status=400)


class RemoveParticipantsView(View):
    @method_decorator(permission_required(perm='auth.admin', raise_exception=True))
    def post(self, request, identifier):
        project = Project.objects.get(id=int(identifier))

        if not project:
            return JsonResponse({'message': 'Not found'}, status=404)

        try:
            values = json.loads(request.body)

            if 'userId' not in values:
                return JsonResponse({'message': 'Bad request!'}, status=400)

            u = project.participants.get(id=values['userId'])

            project.participants.remove(u)
            project.save()

            return JsonResponse({}, status=200)
        except ValueError:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)
        except Exception:
            return JsonResponse({'message': 'Bad request!'}, status=400)


class ParticipantsView(View):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, identifier):

        try:
            project = Project.objects.get(id=int(identifier))
            PrivilegeCheck.can_access_project(project, request.user)

            participants = project.participants.all()

            if 'count' in request.GET and 'pattern' in request.GET:
                count = request.GET['count']
                pattern = request.GET['pattern']

                participants = participants.filter(username__contains=pattern)[:count]

            count = participants.count()

            if 'per_page' in request.GET and 'page' in request.GET:
                per_page = request.GET['per_page']
                page = request.GET['page']

                paginator = Paginator(participants, per_page)

                page = min(int(page), paginator.num_pages)
                participants = paginator.page(page)

            data = [model_to_dict(instance, exclude=['participants'], fields=['username', 'id']) for instance in
                    participants]
            return JsonResponse({'users': data, 'count': count}, status=200)

        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)