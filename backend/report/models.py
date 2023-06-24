from django.db import models


class CIHCalculation(models.Model):
    date = models.DateField()
    branch = models.ForeignKey("organization.Branch", on_delete=models.RESTRICT)
    admission_fee = models.IntegerField(default=0)
    deposit_collection = models.IntegerField(default=0)
    installment_collection = models.IntegerField(default=0)
    others_income = models.IntegerField(default=0)
    loan_distribution = models.IntegerField(default=0)
    deposit_return = models.IntegerField(default=0)
    others_cost = models.IntegerField(default=0)
    cache_in_hand = models.IntegerField(default=0)
