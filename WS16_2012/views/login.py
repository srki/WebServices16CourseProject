import json

from django.views.generic import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist


class LoginView(View):
    def post(self, request):

        credentials = json.loads(request.body)

        user = authenticate(username=credentials['username'], password=credentials['password'])

        if user is not None:
            login(request, user)

            role = 'admin' if user.has_perm('auth.admin') else 'user'
            return JsonResponse({'role': role}, status=200)

        else:
            return JsonResponse({'message': "The provided credentials are not valid!"}, status=400)


class LogoutView(View):
    def post(self, request):
        logout(request)


class RegisterView(View):
    def post(self, request):
        try:
            credentials = json.loads(request.body)
            User.objects.get(username=credentials['username'])

            return JsonResponse({'message': 'An user with that username already exists!'}, status=400)
        except ObjectDoesNotExist:
            u = User.objects.create_user(username=['username'], password=credentials['password'])
            u.save()

            return JsonResponse({}, status=200)
        except ValueError:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)