from django.urls import path

from peoples.views import MemberListCreateView, MemberDetailsView


urlpatterns = [
    path("members/", MemberListCreateView.as_view(), name="list_create"),
    path("members/<pk>/", MemberDetailsView.as_view(), name="details"),
]
