from django.urls import path
from rest_framework import routers
from peoples.views import (
    MemberListCreateView,
    MemberDetailsView,
    StaffViewSet
)


# peoples router config
peoples_router = routers.DefaultRouter()

# registered endpoints verbs
peoples_router.register('staffs', StaffViewSet)


urlpatterns = [
    path("members/", MemberListCreateView.as_view(), name="list_create"),
    path("members/<pk>/", MemberDetailsView.as_view(), name="details"),
]

