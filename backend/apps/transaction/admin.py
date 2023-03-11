from django.contrib import admin
from .models import Savings


class SavingsAdmin(admin.ModelAdmin):
    list_display = ('branch', 'member', 'amount')


admin.site.register(Savings, SavingsAdmin)
