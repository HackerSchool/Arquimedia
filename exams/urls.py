# users/urls.py

from django.conf.urls import url, include
from django.urls import path
from .views import test_exam_creation

urlpatterns = [
    url(r"", test_exam_creation),
]