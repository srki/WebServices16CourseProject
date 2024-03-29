import re

from django.views.generic import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from WS16_2012.views.views import RestView
from django.contrib.auth.models import Permission


class LoginView(RestView):

    def rest_get(self, request):

        if request.user.is_authenticated():
            role = 'admin' if request.user.has_perm('auth.admin') else 'user'
            return JsonResponse({'role': role, 'id': request.user.id}, status=200)

        return JsonResponse({}, status=403)

    def rest_post(self, request, json_values):

        user = authenticate(username=json_values['username'], password=json_values['password'])

        if user is not None:
            login(request, user)

            role = 'admin' if user.has_perm('auth.admin') else 'user'
            return JsonResponse({'role': role, 'id': user.id}, status=200)

        else:
            return JsonResponse({'message': "The provided credentials are not valid!"}, status=400)


class LogoutView(View):
    def post(self, request):
        if request.user.is_authenticated():
            logout(request)
            return JsonResponse({}, status=200)

        return JsonResponse({}, status=400)


class RegisterView(RestView):
    def rest_post(self, request, json_values):
        try:
            if not re.match('^[A-Za-z0-9]+$', json_values['username']):
                return JsonResponse({'message': 'Invalid username!'}, status=400)

            User.objects.get(username=json_values['username'])

            return JsonResponse({'message': 'An user with that username already exists!'}, status=400)
        except ObjectDoesNotExist:
            u = User.objects.create_user(username=json_values['username'], password=json_values['password'])
            p = Permission.objects.get(codename='user')
            u.user_permissions.add(p)
            u.save()

            return JsonResponse({}, status=200)
