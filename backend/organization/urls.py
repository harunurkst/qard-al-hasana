from django.urls import path

from organization.views import TeamCreateListApiView

urlpatterns = [
    path("teams/", TeamCreateListApiView.as_view(), name="teams"),
]
