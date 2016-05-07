from WS16_2012.views.views import View, PrivilegeCheck
from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator
from WS16_2012.models import Project
from django.http import JsonResponse


class AssignedTasksReportView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id):

        try:
            p = Project.objects.get(id=project_id)
            PrivilegeCheck.can_access_project(p, request.user)

            task_no = float(p.task_set.count())

            data = []
            for u in p.participants.all():
                asg_no = float(u.assigned.all().count())
                if task_no != 0:
                    data.append({"username": u.username, "percentage": (asg_no/task_no)})
                else:
                    data.append({"username": u.username, "percentage": 0})

            return JsonResponse(data, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Bad request"}, status=400)


class CompletedTasksReportView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id):

        try:
            p = Project.objects.get(id=project_id)
            PrivilegeCheck.can_access_project(p, request.user)

            data = []
            for u in p.participants.all():
                asg_no = float(u.assigned.all().count())
                cmp_no = float(u.assigned.filter(status='DONE').all().count())

                if asg_no != 0:
                    data.append({"username": u.username, "percentage": (cmp_no/asg_no)})
                else:
                    data.append({"username": u.username, "percentage": 0})

            return JsonResponse(data, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Bad request"}, status=400)


"""
class TasksCreatedView(View):

    @method_decorator(permission_required(perm='auth.user', raise_exception=True))
    def get(self, request, project_id):

        try:
            p = Project.objects.get(id=project_id)
            PrivilegeCheck.can_access_project(p, request.user)

            t = p.task_set.all().order_by('date')

            x = []
            y = []


            return JsonResponse(data, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"message": "Bad request"}, status=400)
"""