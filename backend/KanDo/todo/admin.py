from django.contrib import admin

from todo import models

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Kanban)
admin.site.register(models.Todo)