from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from rest_framework import permissions
from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
# from drf_yasg.views import get_schema_view
# from drf_yasg import openapi

from organization.views import LoginView, RegisterView

# peoples router
from peoples.urls import peoples_router


# schema_view = get_schema_view(
#     openapi.Info(
#         title="Korje Hasana Bangladesh",
#         default_version="v1",
#         description="Test description",
#         terms_of_service="https://www.google.com/policies/terms/",
#         contact=openapi.Contact(email="info@Korje-hasana-bangladesh.com"),
#         license=openapi.License(name="BSD License"),
#     ),
#     public=True,
#     permission_classes=[permissions.AllowAny],
# )

urlpatterns = [

    path("admin/", admin.site.urls),

    # api docs
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # path(
    #     "",
    #     schema_view.with_ui("swagger", cache_timeout=0),
    #     name="schema-swagger-ui",
    # ),
    #
    # path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),

    # authentications
    path("api/v1/auth/login/", LoginView.as_view(), name="login"),
    path("api/v1/auth/registration/", RegisterView.as_view(), name="register"),
    path("api/v1/auth/refresh/", TokenRefreshView.as_view(), name="refresh"),

    # organization
    path("api/v1/organization/", include("organization.urls")),

    # peoples router
    path("api/v1/peoples/", include("peoples.urls")),

    # transaction router
    path("api/v1/transaction/", include("transaction.urls")),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

