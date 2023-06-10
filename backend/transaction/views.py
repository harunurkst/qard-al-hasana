from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListCreateAPIView

from peoples.models import Member
from peoples.permissions import IsSameBranch
from .models import GeneralTransaction, Loan, Savings, Installment
from .serializers import GeneralTransactionSerializer, SavingsSerializer, LoanDisbursementSerializer, LoanInstallmentSerializer
from .utils import format_savings_date, format_loan_data
from korjo_soft.permissions import IsBranchOwner


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


class LoanDisbursementView(APIView):
    """
    Member Loan Disbursement
    """
    serializer_class = LoanDisbursementSerializer
    permission_classes = [IsAuthenticated, IsSameBranch]

    def post(self, request):
        serializer = LoanDisbursementSerializer(data=request.data)
        if serializer.is_valid():
            # check member already have unpaid loan
            unpaid_loan = Loan.objects.filter(
                member_id=serializer.validated_data['member'], is_paid=False).exists()
            if unpaid_loan:
                resp = {
                    'status': 'failed',
                    'message': 'Member already have unpaid loan'
                }
                return Response(resp, status=400)
            member = serializer.validated_data['member']
            serializer.save(
                branch=request.user.staff.branch,
                team=member.team,
                organization=request.user.staff.branch.organization,
                created_by=request.user,
            )
            return Response({'status': 'success'}, status=201)
        return Response({'status': 'failed', 'message': 'invalid data'}, status=400)


class LoanInstallmentView(APIView):
    serializer_class = LoanInstallmentSerializer
    permission_classes = [IsAuthenticated, IsSameBranch]

    def post(self, request):
        serializer = LoanInstallmentSerializer(data=request.data)
        if serializer.is_valid():
            installment = serializer.save()
            loan_object = installment.loan
            installment_amount = serializer.validated_data['amount']
            # Update loan status
            loan_object.pay_installment(installment_amount)
            return Response({'status': 'success'}, status=201)
        return Response({'status': 'failed', 'message': serializer.errors}, status=400)


class MemberSavingsData(APIView):
    """
    [{
        "sl": 1,
        "member_id": 1,
        "member_name": "Harun",
        "guardian_name": "Sadrul Islam",
        "balance": 0,
        "week1": 0,
        "week2": 0,
        "week3": 0,
        "week4": 0
    }
    ]
    """

    def get(self, request):
        data = []
        month = self.request.query_params.get('month', datetime.today().month)
        team = self.request.query_params.get('team', None)
        staff_branch = request.user.staff.branch
        members = Member.objects.filter(branch=staff_branch)
        if team:
            members = members.filter(team=team)
        for member in members:
            member_savings = Savings.objects.filter(
                member=member, date__month=month)
            savings_data = format_savings_date(member_savings, member)
            data.append(savings_data)
        return Response(data)


class MemberLoanData(APIView):
    """
    [
    {
        "sl": 1,
        "member_id": 1,
        "member_name": "Harun",
        "guardian_name": "Test",
        "loan_id": 1,
        "loan_amount": 5000,
        "loan_balance": 2000,
        "week1": 500,
        "week2": 300,
        "week3": 0,
        "week4": 0
    }
    ]
    """

    def get(self, request):
        data = []
        month = self.request.query_params.get('month', datetime.today().month)
        team = self.request.query_params.get('team', None)
        staff_branch = request.user.staff.branch
        active_loans = Loan.objects.filter(
            branch=staff_branch, is_paid=False).select_related('member')

        if team:
            active_loans = active_loans.filter(team=team)
        for loan in active_loans:
            installments = Installment.objects.filter(
                loan=loan, date__month=month)
            installment_data = format_loan_data(loan, installments)
            data.append(installment_data)
        return Response(data)


class IncomeTransaction(ListCreateAPIView):
    serializer_class = GeneralTransactionSerializer
    permission_classes = [IsBranchOwner]

    def perform_create(self, serializer):
        serializer.save(transaction_type='income', branch=self.request.user.branch, organization=self.request.user.branch.organization)
    
    def get_queryset(self):
        return GeneralTransaction.objects.filter(transaction_type='income', branch=self.request.user.branch)