from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

from peoples.permissions import IsSameBranch
from .serializers import DepositSerializer


class DepositView(CreateAPIView):
    serializer_class = DepositSerializer
    permission_classes = [IsAuthenticated, IsSameBranch]

    def perform_create(self, serializer):
        user = self.request.user
        return serializer.save(
            branch=user.staff.branch,
            organization=user.staff.branch.organization,
            created_by = user
        )




