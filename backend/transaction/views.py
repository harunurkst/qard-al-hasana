from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView

from peoples.models import Member
from peoples.permissions import IsSameBranch
from .models import Loan, Savings
from .serializers import SavingsSerializer, LoanDisbursementSerializer, LoanInstallmentSerializer


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
            unpaid_loan = Loan.objects.filter(member_id=serializer.validated_data['member'], is_paid=False).exists()
            if unpaid_loan:
                resp = {
                    'status': 'failed',
                    'message': 'Member already have unpaid loan'
                }
                return Response(resp, status=400)

            serializer.save(
                branch=request.user.staff.branch,
                organization=request.user.staff.branch.organization,
                created_by=request.user,
            )
            return Response({'status':'success'}, status=201)
        return Response({'status':'failed', 'message': 'invalid data'}, status=400)


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
        "id": 1,
        "sl":1,
        "name":"name1",
        "gurdian":",
        "week1": 500,
        "week2": 500,
        "week3": 500,
        "balance": 2000,
    },
    ]
    """
    def get(self, request):
        data = []
        month = self.request.query_params.get('month', datetime.today().month)
        team = self.request.query_params.get('team', None)
        staff_branch = request.user.staff.branch
        members = Member.objects.filter(team=team)
        for member in members:
            member_savings = Savings.objects.filter(member=member, date__month=month)
            d = {}
            d["balance"] = member_savings.last().balance
            d["member_name"] = member
            for s in member_savings:
                if s.date < 7:
                    d["week1"] = s.amount
                elif s.date > 7 and s.date < 14:
                    d["week2"] = s.amount
                elif s.date > 14 and s.date < 31:
                    d["week3"] = s.amount
            data.append(d)
        return Response(data)
