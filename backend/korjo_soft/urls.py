from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from organization.api import ChangePasswordAPIView, LoginView, RegisterView, LogoutView


urlpatterns = [
    path("admin/", admin.site.urls),
    # api docs
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path("", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # authentications
    path("api/v1/auth/login/", LoginView.as_view(), name="login"),
    path("api/v1/auth/logout/", LogoutView.as_view(), name="logout"),
    path("api/v1/auth/registration/", RegisterView.as_view(), name="register"),
    path("api/v1/auth/password/change/", ChangePasswordAPIView.as_view(), name="change_password"),
    path("api/v1/auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # organization
    path("api/v1/organization/", include("organization.routes")),
    # peoples
    path("api/v1/peoples/", include("peoples.urls")),
    # transaction
    path("api/v1/transaction/", include("transaction.routes")),

    path("dashboard/transactions/", include("transaction.urls")),
    path("dashboard/org/", include("organization.urls")),
    path("accounts/", include("accounts.urls"))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
