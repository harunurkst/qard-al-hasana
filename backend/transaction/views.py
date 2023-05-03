from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

from peoples.permissions import IsSameBranch
from .serializers import SavingsSerializer


class DepositView(CreateAPIView):
    serializer_class = SavingsSerializer
    permission_classes = [IsAuthenticated, IsSameBranch]

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(
            branch=user.staff.branch,
            organization=user.staff.branch.organization,
            created_by=user,
            transaction_type='deposit'
        )

class WithdrawView(CreateAPIView):
    serializer_class = SavingsSerializer
    permission_classes = [IsAuthenticated, IsSameBranch]

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(
            branch=user.staff.branch,
            organization=user.staff.branch.organization,
            created_by=user,
            transaction_type='withdraw'
        )




