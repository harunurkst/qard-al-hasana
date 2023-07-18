from rest_framework import serializers
from .models import GeneralTransaction, Savings, Loan, Installment, TransactionCategory


class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = ('member', 'amount', 'date')

    def create(self, validated_data):
        transaction_type = validated_data['transaction_type']
        member = validated_data['member']
        savings = Savings(**validated_data)
        savings.team = member.team
        if transaction_type == 'deposit':
            savings.deposit()
        else:
            savings.withdraw()
        return savings


class LoanDisbursementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('amount', 'date', 'member', 'total_installment')


class LoanInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = ('amount', 'date', 'loan')

    def validate(self, attrs):
        loan = attrs.get('loan')
        if loan.is_paid:
            raise serializers.ValidationError("Loan is already paid")
        return attrs


class GeneralTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralTransaction
        fields = ('id','amount', 'date', 'category', 'summary', )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.update({
            'category': instance.category.name,
        })
        return data


class TransactionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionCategory
        fields = ('name', )
