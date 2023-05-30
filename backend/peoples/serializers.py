from rest_framework import serializers

from peoples.models import Member, Staff


class MemberDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


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
