from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from backend.user.models import User

new_group, created = Group.objects.get_or_create(name='Author')
# Code to add permission to group ???
ct = ContentType.objects.get_for_model(User)

# Now what - Say I want to add 'Can add project' permission to new_group?
permission = Permission.objects.create(codename='courses.add_course',
                                       name='Can add course',
                                       content_type=ct)
new_group.permissions.add(permission)

permission = Permission.objects.create(codename='courses.change_courses',
                                       name='Can change course',
                                       content_type=ct)
new_group.permissions.add(permission)

permission = Permission.objects.create(codename='courses.delete_courses',
                                       name='Can delete course',
                                       content_type=ct)
new_group.permissions.add(permission)



