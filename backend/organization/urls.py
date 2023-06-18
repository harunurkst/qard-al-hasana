from django.urls import path
from rest_framework.routers import DefaultRouter

from organization.views import (
    TeamCreateListApiView,
    StaffViewSet,
    BranchViewSet
)


# router config
router = DefaultRouter()

# router api verbs
router.register(r'staffs', StaffViewSet, basename='staffs')
router.register(r'branches', BranchViewSet, basename='branches')


urlpatterns = [
    path("teams/", TeamCreateListApiView.as_view(), name="teams"),
]

urlpatterns += router.urls