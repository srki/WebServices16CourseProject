from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

u1 = User.objects.create_user('a', password='a')
u1.save()

u2 = User.objects.create_user('b', password='b')

ct = ContentType.objects.get(app_label="auth", model="permission")
permission = Permission(name='Is Admin', codename='admin', content_type=ct)
permission.save()

permission = Permission.objects.get(name='Is Admin')
u2.user_permissions.add(permission)

u2.save()
