from rest_framework import serializers
from .models import GeneralTransaction, Savings, Loan, Installment, TransactionCategory
from journal.models import GeneralJournal, Ledger


class DepositSerializer(serializers.ModelSerializer):
    amount = serializers.IntegerField()

    class Meta:
        model = GeneralJournal
        fields = ("member", "amount", "date")


class LoanDisbursementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ("amount", "date", "member", "total_installment")


class LoanInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = ("amount", "date", "loan")

    def validate(self, attrs):
        loan = attrs.get("loan")
        if loan.is_paid:
            raise serializers.ValidationError("Loan is already paid")
        return attrs


class GeneralTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTransaction
        fields = (
            "id",
            "amount",
            "date",
            "category",
            "summary",
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.update(
            {
                "category": instance.category.name,
            }
        )
        return data


class TransactionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = (
            "id",
            "name",
            "category_type"
        )
