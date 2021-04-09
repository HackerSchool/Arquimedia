# users/urls.py

from django.conf.urls import url, include
from django.urls import path
from .views import list_exams

urlpatterns = [
    url("list", list_exams)
]