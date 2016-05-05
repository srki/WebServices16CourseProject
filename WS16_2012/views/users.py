from django.http import JsonResponse
from django.forms.models import model_to_dict

from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator

from WS16_2012.views.views import RestView
from django.contrib.auth.models import User


class UsersView(RestView):

    @method_decorator(permission_required(perm='auth.admin', raise_exception=True))
    def rest_get(self, request):

        if 'count' in request.GET and 'pattern' in request.GET:
            count = request.GET['count']
            pattern = request.GET['pattern']

            users = User.objects.all().filter(username__contains=pattern)[:count]
            data = [model_to_dict(instance, fields=['username', 'id']) for instance in users]

            return JsonResponse(data, status=200, safe=False)
        else:
            return JsonResponse({"message": "Bad request"}, status=400)