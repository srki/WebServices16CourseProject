from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from WS16_2012.models import Project


# PERMISSIONS
ct = ContentType.objects.get(app_label="auth", model="permission")

p2 = Permission(name='Is Admin', codename='admin', content_type=ct)
p2.save()

p1 = Permission(name='Is User', codename='user', content_type=ct)
p1.save()

# USERS
u1 = User.objects.create_user('a', password='a')

u1.user_permissions.add(p1)

u1.save()

u2 = User.objects.create_user('b', password='b')

u2.user_permissions.add(p1)
u2.user_permissions.add(p2)

u2.save()

# PROJECTS

p1 = Project(name='Vizlore 1', description='Vidj sto je lep nas ios projekat')
p1.save()

p2 = Project(name='Vizlore 2', description='Vidj sto je lep nas ios projekat')
p2.save()

for i in xrange(10):
    p = Project(name='Vizlore ' + str(i+3), description='Vidj sto je lep nas ios projekat')
    p.save()

# PARTICIPANTS
p1.participants.add(u1)
p1.save()

p2.participants.add(u1)
p2.save()
