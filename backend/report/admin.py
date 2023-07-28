from django.contrib import admin
from .models import CIHCalculation


class CacheInHandAdmin(admin.ModelAdmin):
    list_display = ("id", "branch", "date", "cash_in_hand")


admin.site.register(CIHCalculation, CacheInHandAdmin)
