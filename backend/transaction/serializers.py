from rest_framework import serializers
from .models import Savings, Loan, Installment


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
        fields = ('amount', 'date', 'member','total_installment')

class LoanInstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = ('amount', 'date', 'loan')

    def validate(self, attrs):
        loan = attrs.get('loan')
        if loan.is_paid:
            raise serializers.ValidationError("Loan is already paid")
        return attrs
