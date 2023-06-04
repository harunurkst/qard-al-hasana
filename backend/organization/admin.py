from django.contrib.admin.sites import AlreadyRegistered
from django.contrib import admin
from django.apps import apps

from organization.models import Team, User


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["username", "is_staff", "is_superuser", "is_active"]

    def save_model(self, request, obj, form, change):
        # Hash the password when saving the user object
        obj.set_password(obj.password)
        super().save_model(request, obj, form, change)


@admin.register(User)
class CustomUser(CustomUserAdmin):
    pass


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "branch", "owner"]
    list_display_links = ["name"]
    ordering = ["id"]


# register all the models from this app
app_models = apps.get_app_config("organization").get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
