import uuid
from django.db import models

from organization.models import User

STAFF_ROLES = (("cl", "Collector"), ("bw", "Branch Owner"))


class Staff(models.Model):
    name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=11)
    email = models.EmailField(blank=True, null=True)
    branch = models.ForeignKey(
        "organization.Branch", on_delete=models.CASCADE, db_index=True
    )
    user = models.OneToOneField(User, on_delete=models.SET_NULL, blank=True, null=True)
    role = models.CharField(max_length=5, choices=STAFF_ROLES, default="bw")

    def __str__(self):
        return self.name





GENDER_CHOICES = (
    ("male", "Male"),
    ("female", "Female"),
)


class Member(models.Model):
    name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=11)
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
