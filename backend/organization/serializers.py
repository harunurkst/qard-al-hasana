from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from organization.models import User, Team
from peoples.models import Staff


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}


class UserSerilizerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = UserSerializer.Meta.fields + ["token"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        access = refresh.access_token

        user_data = {
            "username": obj.username,

        }
        access["user"] = user_data

        return {
            "refresh": str(refresh),
            "access": str(access),
        }


class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        user_data = {
            "username": user.username,
            "branch": user.branch.id,
            "role": user.role
        }
        token["user"] = user_data

        return token


class MyRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get("refresh")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.verify()
                user = token.payload.get("user")
                # Add custom claims
                user_data = {
                    "username": user.username,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                }
                new_token = RefreshToken.for_user(user)
                new_token["user"] = user_data
                return {"access": str(new_token)}
            except Exception as e:
                raise serializers.ValidationError("Invalid token")
        else:
            raise serializers.ValidationError("Refresh token is required")

class TeamSerializerBase(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('id', 'name', 'owner', 'branch')

class TeamSerializer(TeamSerializerBase):
    pass

# Staff List Serializer
class StaffListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = '__all__'