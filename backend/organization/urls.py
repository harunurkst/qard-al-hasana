from django.urls import path
from .views import *


urlpatterns = [
    path("teams", team_list, name="team_list"),
]