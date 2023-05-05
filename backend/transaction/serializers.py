from rest_framework import serializers
from .models import Savings, Loan


class SavingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = ('member', 'amount', 'date')

    def create(self, validated_data):
        transaction_type = validated_data['transaction_type']
        savings = Savings(**validated_data)
        if transaction_type == 'deposit':
            savings.deposit()
        else:
            savings.withdraw()
        return savings


class LoanDisbursementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('amount', 'date', 'member','total_installment')
