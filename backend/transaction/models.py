from django.db import models
from organization.models import BaseModel

SAVINGS_TRANS_TYPE = (
    ('deposit', 'Deposit'),
    ('withdraw', 'Withdraw'),
)

TRANSACTION_TYPE = (
    ('income', 'Income'),
    ('expense', 'Expense'),
)


class TransactionCategory(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class GeneralTransaction(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    transaction_type = models.CharField(choices=TRANSACTION_TYPE, max_length=10)
    category = models.ForeignKey(TransactionCategory, models.PROTECT)
    summary = models.TextField(blank=True, max_length=150)


class Savings(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    balance = models.IntegerField(default=0)
    transaction_type = models.CharField(
        max_length=10, choices=SAVINGS_TRANS_TYPE, default='deposit')
    member = models.ForeignKey("peoples.Member", on_delete=models.PROTECT)
    team = models.ForeignKey("organization.Team", on_delete=models.PROTECT)

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
    team = models.ForeignKey("organization.Team", on_delete=models.PROTECT)
    is_paid = models.BooleanField(default=False)
    total_installment = models.IntegerField(default=0)
    installment_paid = models.IntegerField(default=0)
    total_paid = models.IntegerField(default=0)
    total_due = models.IntegerField(default=0)

    def pay_installment(self, amount):
        """
        Update Loan status after installment submission
        """
        total_paid = self.total_paid + amount
        total_due = self.total_due - amount
        self.total_paid = total_paid
        self.total_due = total_due
        self.installment_paid = self.installment_paid + 1
        if total_paid >= self.amount and total_due <= 0:
            self.is_paid = True
        self.save()
        print("after save")

    def save(self, *args, **kwargs):
        if not self.pk:
            # total_due = Loan amount
            self.total_due = self.amount
        super().save(*args, **kwargs)


class Installment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount = models.IntegerField()
    date = models.DateField()

    class Meta:
        unique_together = ('loan', 'date')
