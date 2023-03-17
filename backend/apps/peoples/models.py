import uuid
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

STAFF_ROLES = (("cl", "Collector"), ("bw", "Branch Owner"))

phone_regex = RegexValidator(
    regex=r"^(((?:\+88)?(?:\d{11}))|((?:01)?(?:\d{11})))$",
    message="Phone number must be entered in the format: +8801555555550, "
    "Up to 11 digits allowed.",
)


class Staff(models.Model):
    name = models.CharField(max_length=150)
    mobile_number = models.CharField(
        _("Phone Number"),
        validators=[phone_regex],
        max_length=14,
        unique=True,
        db_index=True,
    )
    email = models.EmailField(blank=True, null=True)
    branch = models.ForeignKey(
        "organization.Branch", on_delete=models.CASCADE, db_index=True
    )
    user = models.OneToOneField(User, on_delete=models.SET_NULL, blank=True, null=True)
    role = models.CharField(max_length=5, choices=STAFF_ROLES, default="bw")

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=150)
    branch = models.ForeignKey("organization.Branch", on_delete=models.CASCADE)
    owner = models.ForeignKey(Staff, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ("name", "branch")

    def __str__(self):
        return self.name


GENDER_CHOICES = (
    ("male", "Male"),
    ("female", "Female"),
)


class Member(models.Model):
    name = models.CharField(max_length=150)
    mobile_number = models.CharField(
        _("Phone Number"),
        validators=[phone_regex],
        max_length=14,
        unique=True,
        db_index=True,
    )
    nid_number = models.CharField(max_length=25, blank=True, null=True)
    guardian_name = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default="male")
    serial_number = models.IntegerField(default=1)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, blank=True, null=True)
    branch = models.ForeignKey("organization.Branch", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("team", "serial_number")

    # TODO: validate serial_number not greater than 25

    def __str__(self):
        return self.name
