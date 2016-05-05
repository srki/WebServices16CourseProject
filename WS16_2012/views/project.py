from django.http import JsonResponse
from django.core import serializers
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView
from WS16_2012.models import Project

from django.core.paginator import Paginator


class ProjectView(RestView):

    def rest_get(self, request):

        if 'per_page' in request.GET and 'page' in request.GET:
            per_page = request.GET['per_page']
            page = request.GET['page']

            projects = Project.objects.all()
            paginator = Paginator(projects, per_page)

            count = paginator.count
            projects = paginator.page(page)

        else:
            projects = Project.objects.all()
            count = projects.count()

        data = [model_to_dict(instance, exclude=['participants']) for instance in projects]
        return JsonResponse({'projects': data, 'count': count}, status=200)
