from django.urls import path
from .views import GetMemberView, SavingsPostingAPI

urlpatterns =[
    path('member/<int:team_id>/<int:serial_number>', GetMemberView.as_view(), name='api_get_member'),
    path('savings-posting/', SavingsPostingAPI.as_view(), name='api_savings_posting'),
]