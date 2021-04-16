# users/urls.py

from django.conf.urls import url, include
from django.urls import path
from .views import list_exams, exam_id_render

app_name = 'exams'
urlpatterns = [
    url("list", list_exams),
    path('<int:id>/exam_render',exam_id_render)
]