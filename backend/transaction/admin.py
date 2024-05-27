from django.contrib import admin
from .models import Savings, Loan, GeneralTransaction

from django.contrib.admin.sites import AlreadyRegistered
from django.contrib import admin
from django.apps import apps


# write custom admin views
@admin.register(Savings)
class SavingsAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "member", "team", "transaction_type", "amount", "balance")
    list_filter = ("member",)


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'member', 'team','branch', 'is_paid', 'amount',
        'total_installment', 'installment_paid', 'total_paid', 'total_due'
    ]
    list_display_links = ['id']
    #list_editable = ['is_paid']
    ordering = ['id']


@admin.register(GeneralTransaction)
class GeneralTransaction(admin.ModelAdmin):
    list_display = ('id','amount', 'date', 'transaction_type', 'category', )
    list_filter = ('date', 'category', 'transaction_type',)


# register all the models from this app
app_models = apps.get_app_config("transaction").get_models()
for model in app_models:
    try:
        admin.site.register(model)
    except AlreadyRegistered:
        pass

