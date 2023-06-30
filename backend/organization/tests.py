from rest_framework import status
from rest_framework.test import APITestCase


class StaffTestCase(APITestCase):
    """ Staff test cases """

    # List (GET): /api/v1/organization/staffs/
    def test_staff_list(self):
        response = self.client.get('/api/v1/organization/staffs/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BranchTestCase(APITestCase):
    """ Branch test cases """

    # List (GET): /api/v1/organization/branches/
    def test_branch_list(self):
        response = self.client.get('/api/v1/organization/branches/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

