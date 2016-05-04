import json

from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.http import JsonResponse


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


class RegisterView(View):
    def post(self, request):
        pass