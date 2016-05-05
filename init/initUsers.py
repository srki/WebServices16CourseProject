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

p3 = Project(name='Vizlore 3', description='Vidj sto je lep nas ios projekat')
p3.save()

p4 = Project(name='Vizlore 4', description='Vidj sto je lep nas ios projekat')
p4.save()

p5 = Project(name='Vizlore 5', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 6', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 7', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 8', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 9', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 10', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 11', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 12', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 13', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 14', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 15', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 16', description='Vidj sto je lep nas ios projekat')
p5.save()

p5 = Project(name='Vizlore 17', description='Vidj sto je lep nas ios projekat')
p5.save()