import uuid
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import gettext_lazy as _
from organization.models import Branch, Team
from accounts.choices import StaffRoles
User = get_user_model()

phone_regex = RegexValidator(
    regex=r"^(((?:\+88)?(?:\d{11}))|((?:01)?(?:\d{11})))$",
    message="Phone number must be entered in the format: +8801555555550, "
    "Up to 11 digits allowed.",
)


class Staff(models.Model):
    user = models.OneToOneField(_("user"), User, on_delete=models.CASCADE, db_index=True)
    name = models.CharField(_("name"), max_length=255)
    phone_number = models.CharField(
        _("Phone Number"),
        validators=[phone_regex],
        max_length=14,
        unique=True,
        db_index=True,
    )
    email = models.EmailField(_("email"), max_length=255, unique=True, db_index=True)
    branch = models.ForeignKey(_('branch'), Branch, on_delete=models.SET_NULL, null=True, blank=True)
    role = models.CharField(_("role"), choices=StaffRoles.choices, max_length=135)


class Member(models.Model):
    uid = models.CharField(max_length=135, default=uuid.uuid4())
    serial_no = models.CharField(max_length=255, unique=True)
    user = models.OneToOneField(_("user"), User, on_delete=models.CASCADE, db_index=True)
    name = models.CharField(_("name"), max_length=135)
    gurdian_name = models.CharField(_("name"), max_length=135)
    phone_number = models.CharField(
        _("Phone Number"),
        validators=[phone_regex],
        max_length=14,
        unique=True,
        db_index=True,
    )
    branch = models.ForeignKey(_('branch'), Branch, on_delete=models.SET_NULL, null=True, blank=True)
    team = models.ForeignKey(_('team'), Team, on_delete=models.SET_NULL, null=True, blank=True)
