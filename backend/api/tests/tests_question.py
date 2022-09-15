import pytest

from django.urls import reverse

from exams.models import Question
from api.serializer import QuestionSerializer

@pytest.mark.django_db
def test_list_questions(client, questions):
    # Tests if questions are listed
    url = reverse("questions-list")
    response = client.get(url)

    questions = Question.objects.all()
    print(len(questions))
    expected_data = QuestionSerializer(questions, many=True).data

    assert response.status_code == 200
    assert response.data == expected_data


@pytest.mark.django_db
def test_list_questions_unauthenticated(unauthenticated_client, questions):
    # Tests if questions are listed when unauthenticated.
    # Should return 401
    url = reverse("questions-list")
    response = unauthenticated_client.get(url)

    assert response.status_code == 401


def test_create_question():
    # Tests if question is created
    pass


def test_create_question_group():
    # Tests if question group is created
    pass


def add_questions_to_group():
    # Tests if questions are added to group
    pass

