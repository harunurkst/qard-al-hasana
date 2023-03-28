from django.contrib.auth.models import update_last_login

from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from organization.serializers import (
    LoginSerializer,
    UserSerializer,
    UserSerilizerWithToken,
    MyRefreshSerializer,
    TeamSerializer,
)
from organization.models import Team


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer


class RefreshTokenView(TokenRefreshView):
    serializer_class = MyRefreshSerializer


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerilizerWithToken(user, many=False).data)


class TeamCreateListApiView(ListCreateAPIView):
    queryset = Team.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    filterset_fields = ["owner", "branch"]
