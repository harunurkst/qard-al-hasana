from rest_framework import serializers

from peoples.models import Member


class MemberDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            "name",
            "mobile_number",
            "nid_number",
            "guardian_name",
            "gender",
            "serial_number",
            "uuid",
            "team",
            "branch",
            "is_active",
        ]


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
            "branch",
        ]

    def validate_serial_number(self, value):
        if value > 25:
            raise serializers.ValidationError(
                "Serial number must not be greater than 25."
            )
        return value
