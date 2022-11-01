"""Arquimedia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from django.contrib.auth import views as auth_views
from .views import CustomLoginView, index, CustomRegisterView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_auth import views
from api.views import VerifyEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', index),
    path("api/", include("api.urls")),
    re_path(r'^rest-auth/login/', CustomLoginView.as_view()),
    re_path(r'^rest-auth/registration/', CustomRegisterView.as_view()),
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/password/reset/confirm/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
]

# Allows to fetch images
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
