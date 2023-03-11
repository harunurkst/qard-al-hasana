from django.db import models


class StaffRoles(models.TextChoices):
    COLLECTOR = "Collector"
    BRANCH_OWNER = "Branch Owner"
