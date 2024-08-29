import uuid
from django.db import models
from django.core.exceptions import ValidationError

from journal.models import GeneralJournal
from transaction.models import Loan

STAFF_ROLES = (("cl", "Collector"), ("bw", "Branch Owner"))


class Staff(models.Model):
    """Like as profile of a Staff user"""

    name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=11, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    user = models.OneToOneField(
        "organization.User", on_delete=models.SET_NULL, blank=True, null=True
    )

    def __str__(self):
        return self.name


GENDER_CHOICES = (
    ("male", "Male"),
    ("female", "Female"),
)


class Member(models.Model):
    name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=11, blank=True, null=True)
    nid_number = models.CharField(max_length=25, blank=True, null=True)
    guardian_name = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="male")
    serial_number = models.IntegerField(default=1)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    team = models.ForeignKey("organization.Team", on_delete=models.RESTRICT)
    branch = models.ForeignKey("organization.Branch", on_delete=models.RESTRICT)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("team", "serial_number")

    def clean(self):
        super().clean()
        if self.serial_number > 25:
            raise ValidationError("Serial number must not be greater than 25.")

    def __str__(self):
        return self.name

    def balance(self):
        return GeneralJournal.objects.get_member_balance(self)

    def has_active_loan(self):
        return Loan.objects.filter(member=self, is_paid=False).exists()

    def get_my_loan(self):
        try:
            return Loan.objects.get(member=self, is_paid=False)
        except:
            return None

