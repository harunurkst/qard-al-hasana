from django.contrib.admin.sites import AlreadyRegistered
from django.contrib import admin
from django.apps import apps

from .models import Team, User, Branch


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "is_staff", "is_superuser", "is_active"]

    def save_model(self, request, obj, form, change):
        # Hash the password only if it has been modified
        if "password" in form.changed_data:
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


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "code", "organization", "address", "bank_account"]
    list_display_links = ["name"]
    ordering = ["id"]


# register all the models from this app
app_models = apps.get_app_config("organization").get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass
