from django.urls import path
from rest_framework.routers import DefaultRouter

from organization.views import (
    TeamCreateListApiView,
    BranchReadOnlyModelViewSet,
    StaffReadOnlyModelViewSet
)


# router config
router = DefaultRouter()

# router api verbs
router.register(r'staffs', StaffReadOnlyModelViewSet, basename='staffs')
router.register(r'branches', BranchReadOnlyModelViewSet, basename='branches')

urlpatterns = [

    path("teams/", TeamCreateListApiView.as_view(), name="teams")

]

urlpatterns += router.urls

