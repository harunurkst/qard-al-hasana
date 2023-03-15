from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from rest_framework import permissions
from rest_framework_simplejwt.views import TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from organization.views import LoginView, RegisterView

schema_view = get_schema_view(
    openapi.Info(
        title="Korje Hasana Bangladesh",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="info@Korje-hasana-bangladesh.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # api docs
    path(
        "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # authentications
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/registration/", RegisterView.as_view(), name="register"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="refresh"),
    # organization
    path("organization/", include("organization.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
