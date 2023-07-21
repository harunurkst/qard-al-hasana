from django.urls import path

from rest_framework.routers import DefaultRouter

from organization.views import (
    TeamCreateListApiView,
    TeamRetriveUpdateDestroyView,
    BranchReadOnlyModelViewSet,
    StaffReadOnlyModelViewSet
)


# router config
router = DefaultRouter()

# router api verbs
router.register(r'staffs', StaffReadOnlyModelViewSet, basename='staffs')
router.register(r'branches', BranchReadOnlyModelViewSet, basename='branches')  # basename used for unit testing

urlpatterns = [

    path("teams/", TeamCreateListApiView.as_view(), name="teams"),

    path("teams/<int:pk>/", TeamRetriveUpdateDestroyView.as_view(),
         name="team_re_up_delete"),
]

urlpatterns += router.urls


