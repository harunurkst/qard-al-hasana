from django.urls import path
from rest_framework import routers
from peoples.views import (
    MemberListCreateView,
    MemberDetailsView
)


# peoples router config
peoples_router = routers.DefaultRouter()


urlpatterns = [
    path("members/", MemberListCreateView.as_view(), name="list_create"),
    path("members/<pk>/", MemberDetailsView.as_view(), name="details"),
]

urlpatterns += peoples_router.urls