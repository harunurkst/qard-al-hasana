from rest_framework import serializers
from peoples.models import Member
from transaction.models import Savings


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        exclude = ('is_active', 'team', 'branch')


class SavingPostingSerializer(serializers.Serializer):
    team = serializers.IntegerField()
    serial_number = serializers.IntegerField()
    amount = serializers.IntegerField()
    date = serializers.DateField()

    def create(self, validated_data):
        team = validated_data.get('team')
        serial_number = validated_data.get('serial_number')
        amount = validated_data.get('amount')
        date = validated_data.get('date')
        staff = validated_data.get('staff')

        print(date)

        member = Member.objects.get(team_id=team, serial_number=serial_number)
        # staff, branch
        savings = Savings.objects.create(
            amount=amount,
            date=date,
            member=member,
            staff=staff,
            branch=staff.branch
        )
        return savings