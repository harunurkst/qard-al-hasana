# Generated by Django 4.1.2 on 2023-07-28 01:07

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("report", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="cihcalculation",
            old_name="cache_in_hand",
            new_name="cash_in_hand",
        ),
    ]