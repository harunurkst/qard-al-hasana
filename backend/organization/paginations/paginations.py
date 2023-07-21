from rest_framework.pagination import PageNumberPagination


class CommonPageNumberPagination(PageNumberPagination):
    """ common pagination """

    page_size = 5  # change this value based on needs
    page_size_query_param = 'page_size'

    def get_next_link(self):
        if not self.page.has_next():
            return None
        url = self.request.build_absolute_uri()
        page_number = self.page.next_page_number()
        return page_number

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        url = self.request.build_absolute_uri()
        page_number = self.page.previous_page_number()
        return page_number

