# Generated by Django 4.2.3 on 2024-08-27 04:04

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("report", "0002_rename_cache_in_hand_cihcalculation_cash_in_hand"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="cihcalculation",
            name="organization",
        ),
    ]
