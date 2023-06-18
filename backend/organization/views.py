from django.db.models import Count, Q, Sum, Avg, Max, Min

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from peoples.models import Staff
from transaction.models import Savings

from .serializers import (
    LoginSerializer,
    UserSerializer,
    UserSerilizerWithToken,
    MyRefreshSerializer,
    TeamSerializer,
    StaffListSerializer,
    BranchSerializer
)

from .models import Team, Branch


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


class StaffViewSet(viewsets.ModelViewSet):
    """ allowed http methods: GET, PUT, PATCH, DELETE, HEAD, OPTIONS """
    queryset = Staff.objects.all()
    serializer_class = StaffListSerializer

    def get_queryset(self):
        return self.queryset.filter(branch=self.request.user.branch)


class BranchViewSet(viewsets.ModelViewSet):
    """ allowed http methods: GET, PUT, PATCH, DELETE, HEAD, OPTIONS """
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

    def get_queryset(self):
        # self.queryset.filter(branch=self.request.user.branch)

        return self.queryset.annotate(
            total_deposit=Count('organization'),
            total_due_loan=Count('thana')
        )

