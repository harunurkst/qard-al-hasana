from django.db import models
from django.db.models import Sum


class LedgerType(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Ledger(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=50)
    ledger_type = models.ForeignKey(LedgerType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class JournalManager(models.Manager):
    def cash_credit(self, date, member, amount, branch, remarks=""):
        cash_account = Ledger.objects.get(code='CA')
        entry = self.get_queryset().create(
            date=date,
            member=member,
            accounts=cash_account,
            branch=branch,
            credit=amount,
            remarks=remarks
        )
        return entry

    def cash_debit(self, date, member, amount, branch, remarks):
        cash_account = Ledger.objects.get(code='CA')
        entry = self.get_queryset().create(
            date=date,
            member=member,
            accounts=cash_account,
            branch=branch,
            debit=amount,
            remarks=remarks
        )
        return entry

    def create_loan_entry(self, date, member, amount):
        loan_account_receivable = Ledger.objects.get(code='LO')
        branch = member.branch
        remarks = f'{member.name} loan {amount}'

        # As double entry accounting, Deposit (Account payable) debit
        entry1 = self.get_queryset().create(
            date=date,
            member=member,
            accounts=loan_account_receivable,
            branch=branch,
            debit=amount,
            remarks=remarks
        )
        # Cash Credit
        self.cash_credit(date, member, amount, branch, remarks)
        return entry1

    def create_installment_entry(self, date, member, amount):
        loan_account_receivable = Ledger.objects.get(code='IN')
        branch = member.branch
        remarks = f'{member.name} installment {amount}'

        # As double entry accounting, Installment (Account receivable) credit
        entry1 = self.get_queryset().create(
            date=date,
            member=member,
            accounts=loan_account_receivable,
            branch=branch,
            credit=amount,
            remarks=remarks
        )
        # Cash debit
        self.cash_debit(date, member, amount, branch, remarks)
        return entry1

    def deposit_entry(self, date, member, amount):
        deposit_account_payable = Ledger.objects.get(code='DE')
        branch = member.branch
        remarks = f'{member.name} deposit {amount}'
        # As double entry accounting, Deposit (Account payable) Credit
        entry1 = self.get_queryset().create(
            date=date,
            member=member,
            accounts=deposit_account_payable,
            branch=branch,
            credit=amount,
            remarks=remarks
        )
        # Cash Debit
        self.cash_debit(date, member, amount, branch, remarks)
        return entry1

    def create_withdraw_entry(self, date, member, amount):
        withdraw_account_payable = Ledger.objects.get(code='WI')
        branch = member.branch
        remarks = f'{member.name} withdraw {amount}'

        # As double entry accounting, withdraw (Account payable) Debit
        entry1 = self.get_queryset().create(
            date=date,
            member=member,
            accounts=withdraw_account_payable,
            branch=branch,
            debit=amount,
            remarks=remarks
        )
        # Cash Credit
        self.cash_credit(date, member, amount, branch, remarks)
        return entry1

    def is_already_deposited(self, date, member, amount):
        deposit_account_payable = Ledger.objects.get(code='DE')

        # Deposit (Account payable) Credit
        is_exists = self.get_queryset().filter(
            date=date,
            member=member,
            accounts=deposit_account_payable,
            credit=amount,
        ).exists()
        if is_exists:
            return True
        return False

    def get_member_balance(self, member):
        print("member: ", member)
        members_trans = self.get_queryset().filter(member=member, accounts__ledger_type__code='LP')  # Account Payable
        print(members_trans)
        total_debit = members_trans.aggregate(total_debit=Sum('debit'))['total_debit']
        total_credit = members_trans.aggregate(total_credit=Sum('credit'))['total_credit']
        print("debit, credit ", total_debit, total_credit)
        if total_credit:
            return total_credit - total_debit
        return 0

    def create_income_entry(self, date, branch, amount, remarks=""):
        income_account = Ledger.objects.get(code='INC')
        entry1 = self.get_queryset().create(
            date=date,
            accounts=income_account,
            branch=branch,
            credit=amount,
            remarks=remarks
        )
        self.cash_debit(date=date, member=None, amount=amount, branch=branch, remarks=remarks)

    def create_expense_entry(self, date, branch, amount, remarks=""):
        """
        Cash (-) credit, expense (+) debit
        """
        income_account = Ledger.objects.get(code='EXP')
        entry1 = self.get_queryset().create(
            date=date,
            accounts=income_account,
            branch=branch,
            debit=amount,
            remarks=remarks
        )
        self.cash_credit(date=date, member=None, amount=amount, branch=branch, remarks=remarks)


class GeneralJournal(models.Model):
    date = models.DateField()
    accounts = models.ForeignKey(Ledger, on_delete=models.RESTRICT)
    member = models.ForeignKey('peoples.Member', on_delete=models.SET_NULL, blank=True, null=True)
    branch = models.ForeignKey('organization.Branch', on_delete=models.RESTRICT)
    debit = models.IntegerField(default=0)
    credit = models.IntegerField(default=0)
    remarks = models.CharField(max_length=250, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = JournalManager()

    class Meta:
        unique_together = ('date', 'accounts', 'member')
