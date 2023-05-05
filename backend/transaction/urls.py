from django.urls import path
from . import views


urlpatterns =[
    path('deposit/', views.DepositView.as_view()),
    path('withdraw/', views.WithdrawView.as_view()),
    path('loan-disbursment/', views.LoanDisbursementView.as_view()),
]