from django.db import models

from organization.models import BaseModel


class CIHManager(models.Manager):
    def last_day_cash_in_hand(self, branch, date):
        """
        Last day cash in hand of a branch
        """
        last_cih_obj = CIHCalculation.objects.filter(branch=branch, date__lt=date)
        print("last cih", last_cih_obj)
        if last_cih_obj:
            return last_cih_obj.latest("date").cash_in_hand
        return 0

    def add_cash_in_hand(self, branch, date, amount):
        """
        Add cash in hand for income
        """
        last_day_cih = 0
        cih, is_created = CIHCalculation.objects.get_or_create(
            organization=branch.organization, branch=branch, date=date
        )
        print("is creatd", is_created)
        if is_created:
            # if first time of a date
            last_day_cih = CIHCalculation.objects.last_day_cash_in_hand(branch, date)

        cih.cash_in_hand = cih.cash_in_hand + amount + last_day_cih
        cih.save()

    def deduct_cash_in_hand(self, branch, date, amount):
        """
        deduct cash in hand for expense
        """
        last_day_cih = 0
        cih, is_created = CIHCalculation.objects.get_or_create(
            organization=branch.organization, branch=branch, date=date
        )
        if is_created:
            # if first time of a date
            last_day_cih = CIHCalculation.objects.last_day_cash_in_hand(
                branch, date=date
            )

        cih.cash_in_hand = cih.cash_in_hand - amount + last_day_cih
        cih.save()


class CIHCalculation(BaseModel):
    date = models.DateField()
    cash_in_hand = models.IntegerField(default=0)
    # income
    # admission_fee = models.IntegerField(default=0)
    # deposit_collection = models.IntegerField(default=0)
    # installment_collection = models.IntegerField(default=0)
    # others_income = models.IntegerField(default=0)
    # # expense
    # loan_distribution = models.IntegerField(default=0)
    # deposit_return = models.IntegerField(default=0)
    # others_cost = models.IntegerField(default=0)

    objects = CIHManager()

    def __str__(self):
        return str(self.pk)
