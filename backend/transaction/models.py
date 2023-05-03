from django.db import models
from organization.models import BaseModel

class TransactionCategory(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


SAVINGS_TRANS_TYPE = (
    ('deposit', 'Deposit'),
    ('withdraw', 'Withdraw'),
)


class Savings(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    balance = models.IntegerField(default=0)
    transaction_type = models.CharField(max_length=10, choices=SAVINGS_TRANS_TYPE, default='deposit')
    member = models.ForeignKey("peoples.Member", on_delete=models.PROTECT)

    def deposit(self):
        """
        balance = last balance + savings amount
        """
        latest_savings = Savings.objects.filter(member=self.member).last()
        if latest_savings:
            last_balance = latest_savings.balance
        else:
            last_balance = 0
        self.balance = self.amount + last_balance
        self.transaction_type = 'deposit'
        self.save()

    def withdraw(self):
        """
        balance = last balance - withdrawal amount
        """
        latest_savings = Savings.objects.filter(member=self.member).last()
        if not latest_savings:
            raise ValueError("Withdraw not possible")
        if self.amount > latest_savings.balance:
            raise ValueError("Invalid amount")
        self.balance = latest_savings.balance - self.amount
        self.transaction_type = 'withdraw'
        self.save()


    class Meta:
        unique_together = ('member', 'date', 'transaction_type')




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
