# Generated by Django 4.1.2 on 2023-09-01 05:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("transaction", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="transactioncategory",
            name="category_type",
            field=models.CharField(
                choices=[("income", "Income"), ("expense", "Expense")],
                default="income",
                max_length=10,
            ),
        ),
    ]
