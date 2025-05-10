# Register your models here.
from django.contrib import admin

from .models import Church, Organization

admin.site.register(Organization)
admin.site.register(Church)
