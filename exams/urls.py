# users/urls.py

from django.conf.urls import url, include
from django.urls import path
from .views import *

urlpatterns = [
    url("list", list_exams),
    path("results/<int:id>", results)
]