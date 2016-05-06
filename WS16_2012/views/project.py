import json

from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView, View
from WS16_2012.models import Project

from django.core.paginator import Paginator


class ProjectsView(RestView):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def rest_get(self, request):

        projects = Project.objects.all() if request.user.has_perm('auth.admin') else request.user.project_set.all()
        count = projects.count()

        if 'per_page' in request.GET and 'page' in request.GET:
            per_page = request.GET['per_page']
            page = request.GET['page']

            paginator = Paginator(projects, per_page)

            page = min(int(page), paginator.num_pages)
            projects = paginator.page(page)

        data = [model_to_dict(instance, exclude=['participants']) for instance in projects]
        return JsonResponse({'projects': data, 'count': count}, status=200)

    @method_decorator(permission_required(perm='auth.admin', raise_exception=True))
    def rest_post(self, request, json_values):

        if 'name' in json_values and 'description' in json_values:
            p = Project(name=json_values['name'], description=json_values['description'])
            p.save()
            return JsonResponse({}, status=200)
        else:
            return JsonResponse({'message': 'Name or description not provided!'}, status=400)


class ProjectView(View):
    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, identifier):
        project = Project.objects.get(id=int(identifier))

        if project:
            return JsonResponse(model_to_dict(project, exclude=['participants']), status=200)
        else:
            return JsonResponse({'message': 'Not found'}, status=404)

    @method_decorator(permission_required(perm='auth.admin', raise_exception=True))
    def put(self, request, identifier):

        try:
            values = json.loads(request.body)

            project = Project.objects.get(id=int(identifier))
            if project and 'name' in values and 'description' in values:

                project.name = values['name']
                project.description = values['description']
                project.save()

                return JsonResponse(model_to_dict(project, exclude=['participants']), status=200)
            else:
                return JsonResponse({'message': 'Not found'}, status=404)
        except ValueError:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)
        except Exception:
            return JsonResponse({'message': 'Bad request!'}, status=400)
