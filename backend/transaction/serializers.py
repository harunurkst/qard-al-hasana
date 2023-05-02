from rest_framework import serializers
from .models import Savings


class DepositSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savings
        fields = ('member', 'amount', 'date')

    def create(self, validated_data):
        savings = Savings(**validated_data)
        savings.deposit()
        return savings
