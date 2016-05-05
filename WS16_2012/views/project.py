from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from django.contrib.auth import authenticate
from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView
from WS16_2012.models import Project

from django.core.paginator import Paginator


class ProjectView(RestView):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def rest_get(self, request):

        projects = Project.objects.all() if request.user.has_perm('auth.admin') else request.user.project_set.all()
        count = projects.count()

        if 'per_page' in request.GET and 'page' in request.GET:
            per_page = request.GET['per_page']
            page = request.GET['page']

            paginator = Paginator(projects, per_page)

            count = paginator.count
            projects = paginator.page(page)

        data = [model_to_dict(instance, exclude=['participants']) for instance in projects]
        return JsonResponse({'projects': data, 'count': count}, status=200)
