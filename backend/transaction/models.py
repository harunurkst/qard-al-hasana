from django.db import models
from organization.models import BaseModel

class TransactionCategory(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
class Savings(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    balance = models.IntegerField(default=0)
    member = models.ForeignKey("peoples.Member", on_delete=models.PROTECT)


class Loan(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    member = models.ForeignKey("peoples.Member", on_delete=models.PROTECT)
    is_paid = models.BooleanField(default=False)
    total_installment = models.IntegerField(default=0)


class Installment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount = models.IntegerField()
    date = models.DateField()

TRANSACTION_TYPE = (
    ('income', 'Income'),
    ('expense', 'Expense'),
)
class GeneralTransaction(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    type = models.CharField(choices=TRANSACTION_TYPE, max_length=10)
    category = models.ForeignKey(TransactionCategory, models.PROTECT)
    summary = models.TextField(blank=True, max_length=150)
