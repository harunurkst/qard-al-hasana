# Generated by Django 4.2.3 on 2024-08-27 04:04

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("transaction", "0002_transactioncategory_category_type"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="generaltransaction",
            name="organization",
        ),
        migrations.RemoveField(
            model_name="loan",
            name="organization",
        ),
        migrations.RemoveField(
            model_name="savings",
            name="organization",
        ),
    ]