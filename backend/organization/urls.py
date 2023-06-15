from django.urls import path

from organization.views import TeamCreateListApiView,TeamRetriveUpdateDestroyView, StaffViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'staffs', StaffViewSet, basename='staffs')


urlpatterns = [
    path("teams/", TeamCreateListApiView.as_view(), name="teams"),
    path("teams/<int:pk>/", TeamRetriveUpdateDestroyView.as_view(), name="team_re_up_delete"),
]

urlpatterns += router.urls