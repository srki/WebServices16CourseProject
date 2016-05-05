import json
from django.views.generic import View
from django.http import JsonResponse


class RestView(View):
    def get(self, request):
        #try:
            return self.rest_get(request)
        #except:
        #    return JsonResponse({'message': 'Bad request'}, status=400)

    def post(self, request):

        try:
            json_values = json.loads(request.body)
            return self.rest_post(request, json_values)

        except ValueError:
            return JsonResponse({'message': 'Invalid JSON!'}, status=400)

    def rest_get(self, request):
        pass

    def rest_post(self, request, json_values):
        pass
