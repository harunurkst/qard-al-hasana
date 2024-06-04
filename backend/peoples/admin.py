from django.contrib.admin.sites import AlreadyRegistered
from django.contrib import admin
from django.apps import apps

from peoples.models import Staff, Member


@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ['id', 'name',]
    list_display_links = ['name']
    ordering = ['id']


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'guardian_name', 'serial_number', 'team')
    search_fields = ('name',)