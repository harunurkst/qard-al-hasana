from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)
from django.db import models
from django.db.models import Sum

from .managers import UserManager


class BaseModel(models.Model):
    branch = models.ForeignKey("organization.Branch", on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "organization.User", on_delete=models.SET_NULL, blank=True, null=True
    )

    class Meta:
        abstract = True


class Division(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=50)
    division = models.ForeignKey(Division, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Thana(models.Model):
    name = models.CharField(max_length=50)
    district = models.ForeignKey(District, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Organization(models.Model):
    name = models.CharField(max_length=255, db_index=True, unique=True)
    code = models.IntegerField(unique=True, db_index=True)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    MEMBER = "ME"
    BRANCH_OWNER = "BO"
    COLLECTOR = "CL"
    ORGANIZATION_OWNER = "OO"
    ORGANIZATION_MEMBER = "OM"
    ROLES = [
        (MEMBER, "Member"),
        (BRANCH_OWNER, "Branch Owner"),
        (COLLECTOR, "Collector"),
        (ORGANIZATION_OWNER, "Organization Owner"),
        (ORGANIZATION_MEMBER, "Organization Member"),
    ]
    username = models.CharField(unique=True, max_length=45)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    branch = models.ForeignKey(
        "organization.Branch", null=True, blank=True, on_delete=models.SET_NULL
    )
    role = models.CharField(max_length=10, choices=ROLES, default=MEMBER)

    USERNAME_FIELD = "username"

    objects = UserManager()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.username


class OrgMember(models.Model):
    member_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=14)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    def __str__(self):
        return self.member_name


class Branch(models.Model):
    name = models.CharField(max_length=255)
    code = models.IntegerField(db_index=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    # thana = models.ForeignKey(Thana, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, blank=True, null=True)
    bank_account = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = [["organization", "code"], ["organization", "name"]]

    def __str__(self):
        return self.name


class BranchMember(models.Model):
    name = models.CharField(max_length=150)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)


class Team(models.Model):
    name = models.CharField(max_length=150)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=200, blank=True)

    class Meta:
        unique_together = ("name", "branch")

    def __str__(self):
        return self.name

    def total_unpaid_loan(self):
        return self.loan_set.filter(is_paid=False).aggregate(Sum("total_due"))[
            "total_due__sum"
        ]

    def total_deposit(self):
        return self.savings_set.filter(transaction_type="deposit").aggregate(
            Sum("amount")
        )["amount__sum"]

    def active_loan(self):
        return self.loan_set.filter(is_paid=False).count()
