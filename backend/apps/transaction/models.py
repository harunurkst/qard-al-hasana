from django.db import models
from django.db.models import Sum
import datetime


class SavingsManager(models.Manager):
    def member_total_savings(self, member):
        queryset = self.filter(member=member).aggregate(total=Sum('amount'))
        return queryset['total']


class Savings(models.Model):
    amount = models.IntegerField()
    date = models.DateField(default=datetime.datetime.now)
    member = models.ForeignKey('peoples.Member', on_delete=models.SET_NULL, blank=True, null=True, db_index=True)
    staff = models.ForeignKey('peoples.Staff', on_delete=models.SET_NULL, blank=True, null=True, db_index=True)
    branch = models.ForeignKey('organization.Branch', on_delete=models.CASCADE, db_index=True)
    created_at = models.DateField(auto_now_add=True)

    objects = SavingsManager()

    class Meta:
        unique_together = ('date', 'member')

    def __str__(self):
        return str(self.amount)
