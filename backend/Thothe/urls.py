"""Thothe URL Configuration

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
from django.urls import path
from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from .views import index
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_auth import views

urlpatterns = [
    path('', include("users.urls")),
    path('admin/', admin.site.urls),
    url(r'^$', index),
    url('exame/', include('exams.urls')),
    path("api/", include("api.urls")),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('rest-auth/password/reset/confirm/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]

# Allows to fetch images
urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
