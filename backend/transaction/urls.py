from django.urls import path
from .views import *

urlpatterns =[
    path('', dashboard, name="dashboard"),
    path('deposits/<int:team_id>', deposit_list, name="deposit_list"),
    path('loan/list/<int:team_id>', loan_list, name="loan_list"),
    path('deposit-posting/', DepositPostingView.as_view(), name="deposit_posting"),
    path('loans/create/<int:member>', LoanDisbursementView.as_view(), name='loan_disbursement'),
    path('loans/installment/', installment_posting, name='installment_posting'),

]