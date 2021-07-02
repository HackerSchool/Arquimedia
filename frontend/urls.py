from django.urls import path
from .views import index

urlpatterns = [
	path('test', index),
	path('question/<int:id>', index)
]
