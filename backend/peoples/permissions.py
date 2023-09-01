from rest_framework.permissions import BasePermission


class IsSameBranch(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.branch == request.user.branch
