from rest_framework import status
from rest_framework.test import APITestCase


class StaffTestCase(APITestCase):
    """ Test cases for Staff """

    # List (GET): {host}/api/v1/organization/staffs/
    def test_staff_list(self):
        response = self.client.get('/api/v1/organization/staffs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

