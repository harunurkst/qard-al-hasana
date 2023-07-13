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

from organization.views import LoginView, RegisterView, LogoutView


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
    path("api/v1/auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # organization
    path("api/v1/organization/", include("organization.urls")),
    # peoples
    path("api/v1/peoples/", include("peoples.urls")),
    # transaction
    path("api/v1/transaction/", include("transaction.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
