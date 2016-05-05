from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from WS16_2012.models import Project


# USERS
u1 = User.objects.create_user('a', password='a')
u1.save()

u2 = User.objects.create_user('b', password='b')

ct = ContentType.objects.get(app_label="auth", model="permission")
permission = Permission(name='Is Admin', codename='admin', content_type=ct)
permission.save()

permission = Permission.objects.get(name='Is Admin')
u2.user_permissions.add(permission)

u2.save()

# Projects

p1 = Project(name='Vizlore 1', description='Vidj sto je lep nas ios projekat')
p1.save()

p2 = Project(name='Vizlore 2', description='Vidj sto je lep nas ios projekat')
p2.save()

p3 = Project(name='Vizlore 3', description='Vidj sto je lep nas ios projekat')
p3.save()

p4 = Project(name='Vizlore 4', description='Vidj sto je lep nas ios projekat')
p4.save()
