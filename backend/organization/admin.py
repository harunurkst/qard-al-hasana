from django.contrib import admin
from .models import Organization, OrgMember, Branch, District, Division, Thana

admin.site.register(Organization)
admin.site.register(OrgMember)
admin.site.register(Branch)
admin.site.register(District)
admin.site.register(Thana)
admin.site.register(Division)