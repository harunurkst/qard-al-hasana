# Generated by Django 4.1.2 on 2023-06-16 02:26

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("peoples", "0002_alter_member_team_delete_team"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="staff",
            name="branch",
        ),
        migrations.RemoveField(
            model_name="staff",
            name="role",
        ),
    ]