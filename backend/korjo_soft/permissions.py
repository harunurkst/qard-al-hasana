from rest_framework.permissions import BasePermission

class IsBranchOwner(BasePermission):
    message = 'You must be the Branch Owner'

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role=='BO'
    
    def has_object_permission(self, request, view, obj):
        return obj.branch__user == request.user