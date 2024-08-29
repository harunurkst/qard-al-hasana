# Generated by Django 4.2.3 on 2024-08-25 05:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("peoples", "0001_initial"),
        ("journal", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ledger",
            name="code",
            field=models.CharField(max_length=10, unique=True),
        ),
        migrations.AlterField(
            model_name="ledgertype",
            name="code",
            field=models.CharField(max_length=10, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name="generaljournal",
            unique_together={("date", "accounts", "member")},
        ),
    ]
