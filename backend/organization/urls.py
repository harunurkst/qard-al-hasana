from django.urls import path

from organization.views import TeamCreateListApiView, StaffViewSet

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'staffs', StaffViewSet, basename='staffs')


urlpatterns = [
    path("teams/", TeamCreateListApiView.as_view(), name="teams"),
]

urlpatterns += router.urls