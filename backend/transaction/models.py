from django.db import models
from django.core.exceptions import ValidationError
from organization.models import BaseModel
from report.models import CIHCalculation

SAVINGS_TRANS_TYPE = (
    ("deposit", "Deposit"),
    ("withdraw", "Withdraw"),
)

TRANSACTION_TYPE = (
    ("income", "Income"),
    ("expense", "Expense"),
)

CATEGORY_TYPES = (
    ("income", "Income"),
    ("expense", "Expense"),
)


class TransactionCategory(models.Model):
    name = models.CharField(max_length=50)
    category_type = models.CharField(
        max_length=10, choices=CATEGORY_TYPES, default="income"
    )

    def __str__(self):
        return self.name


class GeneralTransaction(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    transaction_type = models.CharField(choices=TRANSACTION_TYPE, max_length=10)
    category = models.ForeignKey(TransactionCategory, models.PROTECT)
    summary = models.TextField(blank=True, max_length=150)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.transaction_type == "income":
            CIHCalculation.objects.add_cash_in_hand(
                branch=self.branch, date=self.date, amount=self.amount
            )
        else:
            CIHCalculation.objects.deduct_cash_in_hand(
                branch=self.branch, date=self.date, amount=self.amount
            )


class Savings(BaseModel):
    amount = models.IntegerField()
    date = models.DateField()
    balance = models.IntegerField(default=0)
    transaction_type = models.CharField(
        max_length=10, choices=SAVINGS_TRANS_TYPE, default="deposit"
    )
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
        self.transaction_type = "deposit"
        self.save()
        # cash in hand calculation
        CIHCalculation.objects.add_cash_in_hand(
            branch=self.branch, date=self.date, amount=self.amount
        )

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
        self.transaction_type = "withdraw"
        self.save()
        # Cash in hand calculation
        CIHCalculation.objects.deduct_cash_in_hand(
            branch=self.branch, date=self.date, amount=self.amount
        )

    class Meta:
        unique_together = ("member", "date", "transaction_type")


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

    def __str__(self):
        return f"Loan of {self.amount} to {self.member.name}"

    # def clean(self):
    #     # Ensure that total_paid and total_due are consistent
    #     if self.total_paid + self.total_due != self.amount:
    #         raise ValidationError("Total paid and total due must sum up to the loan amount.")

    def pay_installment(self, payment_amount):
        """
        Update Loan status after installment submission
        """
        if self.is_paid:
            raise ValidationError("This loan is already fully paid.")

        if payment_amount > self.total_due:
            raise ValidationError("Payment amount cannot exceed the total due.")

        self.total_paid += payment_amount
        self.total_due -= payment_amount
        self.installment_paid += 1

        if self.total_paid >= self.amount and self.total_due <= 0:
            self.is_paid = True
        self.save()
        # Cash in hand calculation


class Installment(models.Model):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount = models.IntegerField()
    date = models.DateField()

    class Meta:
        unique_together = ("loan", "date")
