from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum

# App related
from peoples.models import Member, Staff
from peoples.permissions import IsSameBranch
from peoples.filters.staff_filters import StaffFilter
from peoples.serializers import (
    MemberCreateSerializer,
    MemberDetailSerializer,
    MemberSavingsLoanInfoSerializer,
)

from transaction.models import Loan, Savings


class MemberListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["team", "branch", "is_active", "gender"]
    search_fields = ["=nid_number", "=mobile_number"]

    def get_queryset(self):
        return Member.objects.filter(branch=self.request.user.staff.branch)

    def perform_create(self, serializer):
        serializer.save(branch=self.request.user.staff.branch)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return MemberCreateSerializer
        return MemberDetailSerializer


class MemberDetailsView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsSameBranch]
    serializer_class = MemberDetailSerializer

    def get_queryset(self):
        return Member.objects.filter(branch=self.request.user.staff.branch)


class MemberSavingLoanInfo(APIView):
    serializer_class = MemberSavingsLoanInfoSerializer

    def get(self, request, *args, **kwargs):
        member = get_object_or_404(Member, id=kwargs.get('id'))
        savings=Savings.objects.filter(member=member).aggregate(Sum('amount'))['amount__sum']
        last_loan = Loan.objects.filter(member=member).last()
        print("total_savings: ", savings)
        data = {
            "total_savings":savings,
            "last_loan": last_loan.amount,
            "loan_date": 0,
            "loan_paid": 0,
            "installment_paid": 0,
            "total_loan_count": 0
        }
        serializer = self.serializer_class(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
