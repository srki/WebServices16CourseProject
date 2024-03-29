"""git URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

from WS16_2012.views.login import LoginView, LogoutView, RegisterView
from WS16_2012.views.project import ProjectsView, ProjectView
from WS16_2012.views.participants import RemoveParticipantsView, ParticipantsView, AddParticipantsView
from WS16_2012.views.users import UsersView
from WS16_2012.views.tasks import TasksView, ProjectTasksView, ProjectTaskView, ProjectTaskHistoryView
from WS16_2012.views.comments import CommentsView, CommentView
from WS16_2012.views.reports import TasksCreatedView, TasksDoneView, TasksDoneByUser
from WS16_2012.views.reports import AssignedTasksReportView, CompletedTasksReportView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/login', LoginView.as_view()),
    url(r'^api/register', RegisterView.as_view()),
    url(r'^api/logout', LogoutView.as_view()),
    url(r'^api/tasks', TasksView.as_view()),
    url(r'^api/projects/(?P<identifier>\d+)/participants/append', AddParticipantsView.as_view()),
    url(r'^api/projects/(?P<identifier>\d+)/participants/remove', RemoveParticipantsView.as_view()),
    url(r'^api/projects/(?P<identifier>\d+)/participants', ParticipantsView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/tasks/(?P<task_id>\d+)/history', ProjectTaskHistoryView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/tasks/(?P<task_id>\d+)/comments/(?P<comment_id>\d+)', CommentView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/tasks/(?P<task_id>\d+)/comments', CommentsView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/tasks/(?P<task_id>\d+)', ProjectTaskView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/reports/users/(?P<user_id>\d+)/done', TasksDoneByUser.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/reports/assigned', AssignedTasksReportView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/reports/completed', CompletedTasksReportView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/reports/created', TasksCreatedView.as_view()),
    url(r'^api/projects/(?P<project_id>\d+)/reports/done', TasksDoneView.as_view()),
    url(r'^api/projects/(?P<identifier>\d+)/tasks', ProjectTasksView.as_view()),
    url(r'^api/projects/(?P<identifier>\d+)', ProjectView.as_view()),
    url(r'^api/projects', ProjectsView.as_view()),
    url(r'^api/users', UsersView.as_view()),
    url(r'^', TemplateView.as_view(template_name="index.html"))
]

