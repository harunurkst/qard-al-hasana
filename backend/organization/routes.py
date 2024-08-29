from django.urls import path
from rest_framework.routers import DefaultRouter
from organization.api import (
    TeamCreateListApiView,
    TeamRetriveUpdateDestroyView,
    StaffReadOnlyModelViewSet,
    BranchDetailView,
)

# router config
router = DefaultRouter()

# router api verbs
router.register(r"staffs", StaffReadOnlyModelViewSet, basename="staffs")

urlpatterns = [
    path("teams/", TeamCreateListApiView.as_view(), name="teams"),
    path(
        "teams/<int:pk>/",
        TeamRetriveUpdateDestroyView.as_view(),
        name="team_re_up_delete",
    ),
    path("branches/<int:pk>/", BranchDetailView.as_view(), name="branch_detail"),

]

urlpatterns += router.urls
