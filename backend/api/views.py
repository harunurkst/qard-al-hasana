from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from peoples.models import Member
from transaction.models import Savings
from api.serializers import MemberSerializer, SavingPostingSerializer


class GetMemberView(APIView):
    def get(self, request, team_id, serial_number):
        user_branch = request.user.branch
        try:
            member = Member.objects.get(branch=user_branch, team_id=team_id, serial_number=serial_number, is_active=True)
            total_savings = Savings.objects.member_total_savings(member)
            serializer = MemberSerializer(member)
            data = serializer.data
            data['total_savings'] = total_savings
            return Response(data)
        except Exception as e:
            data = {
                "msg": str(e)
            }
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class SavingsPostingAPI(APIView):
    def post(self, request):
        print(request.data)
        serializer = SavingPostingSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(staff=request.user.staff)
                return Response({'success': True}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)