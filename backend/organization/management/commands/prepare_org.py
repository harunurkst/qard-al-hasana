from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from organization.models import (
    Organization,
    Staff,
    User,
    Branch,
    Division,
    District,
    Thana, Team
)


class Command(BaseCommand):
    help = "Create a new user, category, and post"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        print("hello ===>")
        # Create new division
        division, _ = Division.objects.get_or_create(name="Test Division")

        # Create new district
        district, _ = District.objects.get_or_create(
            name="Test District", division=division
        )

        # Create new thana
        thana, _ = Thana.objects.get_or_create(name="Test Thana", district=district)

        # Create new organization
        org, _ = Organization.objects.get_or_create(name="Test Org", code=111)

        # Create new branch
        branch, _ = Branch.objects.get_or_create(
            name="Test Branch",
            code=111,
            organization=org,
            thana=thana,
        )

        # Create new user
        user, created = User.objects.get_or_create(username="admin")
        if created:
            user.set_password("admin")
            user.is_superuser = True
            user.is_staff = True
            user.save()

        # Create new staff
        staff, _ = Staff.objects.get_or_create(
            name="Staff User",
            mobile_number="01111111111",
            email="staff@mail.com",
            branch=branch,
            user=user,
        )

        team, _ = Team.objects.get_or_create(
            name="Demo Team",
            owner=staff,
            branch=branch
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully created organization '{org.name}', branch '{branch.name}', user '{user.username}', staff '{staff.name}' team '{team.name}'"
            )
        )
