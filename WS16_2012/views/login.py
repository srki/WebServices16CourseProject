from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.http import JsonResponse


class LoginView(View):
    def post(self, request):

        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)

            role = 'admin' if user.has_perm('ws16_2012.admin') else 'user'
            return JsonResponse({'role': role}, status=200)

        else:
            return JsonResponse({'message': "The provided credentials are not valid!"}, status=400)


class RegisterView(View):
    def post(self, request):
        pass