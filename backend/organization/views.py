from django.db.models import Count, Q, Sum, Avg, Max, Min

from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from peoples.models import Staff
from transaction.models import Savings, Loan

from .serializers import (
    LoginSerializer,
    UserSerializer,
    UserSerilizerWithToken,
    MyRefreshSerializer,
    TeamSerializer,
    StaffListSerializer,
    BranchListSerializer
)

from .models import Team, Branch
from .paginations.paginations import CommonPageNumberPagination


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


class StaffReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    """ provides only list and retrieve actions """

    queryset = Staff.objects.all()
    serializer_class = StaffListSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommonPageNumberPagination

    def get_queryset(self):
        return self.queryset.filter(user__branch=self.request.user.branch)


class BranchReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    """ provides only list and retrieve actions """

    queryset = Branch.objects.all()
    serializer_class = BranchListSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommonPageNumberPagination

    def get_queryset(self):
        # return self.queryset.filter(id=self.request.user.branch.id).annotate(
        return self.queryset.annotate(
            total_deposit=Sum('basemodel__savings__amount',
                              filter=Q(basemodel__savings__transaction_type='deposit'), default=0
                              ) - Sum('basemodel__savings__amount',
                              filter=Q(basemodel__savings__transaction_type='withdraw'), default=0
                              ),
            total_due_loan=Sum(
                'basemodel__loan__total_due',
                filter=Q(basemodel__loan__is_paid=False),
                default=0
            )
        )

