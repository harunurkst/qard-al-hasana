from django_filters import rest_framework as filters

from peoples.models import Staff


class StaffFilter(filters.FilterSet):

    class Meta:
        model = Staff
        fields = ['branch', ]

