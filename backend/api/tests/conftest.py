import pytest

from rest_framework.test import APIClient

from django.contrib.auth.models import User

from exams.factories import *

@pytest.fixture
def user():
    return User.objects.create_user(username="testuser", password="testpass")

@pytest.fixture
def client(user):
    client = APIClient()
    client.force_authenticate(user=user)
    return client

@pytest.fixture
def unauthenticated_client():
    return APIClient()

@pytest.fixture
def questions():
    return questionFactory.create_batch(10)