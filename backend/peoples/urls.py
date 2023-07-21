from django.urls import path
from rest_framework import routers
from peoples.views import (
    MemberListCreateView,
    MemberDetailsView,
    MemberSavingLoanInfo
)


# peoples router config
peoples_router = routers.DefaultRouter()


urlpatterns = [
    path("members/", MemberListCreateView.as_view(), name="list_create"),
    path("members/<int:id>/", MemberDetailsView.as_view(), name="details"),
    path("members/<int:id>/saving-loan-info/", MemberSavingLoanInfo.as_view(), name="saving_loan_info"),
]

urlpatterns += peoples_router.urls