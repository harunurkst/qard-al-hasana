from django.contrib import admin
from .models import Ledger, LedgerType, GeneralJournal


class JournalAdmin(admin.ModelAdmin):
    list_display = ('date', 'member', 'accounts', 'debit', 'credit')
    search_fields = ('member__name', )


class LedgerAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'ledger_type')


class LedgerTypeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name',)


admin.site.register(GeneralJournal, JournalAdmin)
admin.site.register(Ledger, LedgerAdmin)
admin.site.register(LedgerType, LedgerTypeAdmin)