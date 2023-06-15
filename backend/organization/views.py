from rest_framework import viewsets

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
    StaffListSerializer,
)
from organization.models import Team
from peoples.models import Staff


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
    queryset = Team.objects.all().order_by('-id')
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    filterset_fields = ["owner", "branch"]

    def perform_create(self, serializer):
        serializer.save(branch=serializer.validated_data["owner"].branch)

class StaffViewSet(viewsets.ModelViewSet):
    """
    accepts all these http requests with simple codes:

    Create (POST): {host}/api/v1/organization/staffs/
    List (GET): {host}/api/v1/organization/staffs/
    Retrieve (GET): {host}/api/v1/organization/staffs/{id}/
    Update (PUT): {host}/api/v1/organization/staffs/{id}/
    Delete (DELETE): {host}/api/v1/organization/staffs/{id}/
    """

    queryset = Staff.objects.all()
    serializer_class = StaffListSerializer

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.staff.branch)
