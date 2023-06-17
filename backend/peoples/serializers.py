from rest_framework import serializers

from peoples.models import Member, Staff


class MemberDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('id','name', 'mobile_number', 'guardian_name', 'serial_number', 'team', 'branch', )
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.update({
            "team": instance.team.name,
            "branch": instance.branch.name,
            "joined_date": instance.created_at
        })
        return data


class MemberCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "name",
            "mobile_number",
            "nid_number",
            "guardian_name",
            "gender",
            "serial_number",
            "team",
        ]

    def validate_serial_number(self, value):
        if value > 25:
            raise serializers.ValidationError(
                "Serial number must not be greater than 25."
            )
        return value
