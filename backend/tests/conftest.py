import pytest

from users.models import Achievement, Profile
from exams.models import Question

from rest_framework.test import APIClient

from django.contrib.auth.models import User

from .factories import *


@pytest.fixture
def achievement() -> Achievement:
    return AchievementFactory.create()


@pytest.fixture
def achievements(request) -> list[Achievement]:
    return AchievementFactory.create_batch(request.param)


@pytest.fixture
def user() -> User:
    return UserFactory.create()


@pytest.fixture
def profile() -> Profile:
    return UserFactory.create().profile


@pytest.fixture
def profiles(request) -> list[Profile]:
    """Returns a list of profiles.

    The number of profiles is defined by the `request.param` parameter.
    The number of profiles defaults to 10 if no number is provided.
    """
    return [UserFactory.create().profile for _ in range(getattr(request, "param", 10))]


@pytest.fixture
def client(user) -> APIClient:
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture
def unauthenticated_client() -> APIClient:
    return APIClient()


@pytest.fixture
def questions() -> list[Question]:
    return QuestionFactory.create_batch(10)
