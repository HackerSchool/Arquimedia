import pytest

from users.models import Achievement

from rest_framework.test import APIClient

from django.contrib.auth.models import User

from .factories import *


@pytest.fixture
def achievement():
    return AchievementFactory.create()


@pytest.fixture
def user():
    return UserFactory.create()


@pytest.fixture
def profile():
    return UserFactory.create().profile


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
    return QuestionFactory.create_batch(10)
