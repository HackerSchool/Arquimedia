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


@pytest.mark.django_db
def test_create_question(client):
    # Tests if question is created
    url = reverse("question")

    data = {
        "text": "Example of question",
        "resolution": "Example of resolution",
        "answers": [
            {"text": "string", "correct": True},
            {"text": "string", "correct": False},
        ],
        "subject": "math",
        "subsubject": "geometry",
        "year": 11,
        "source": "",
    }

    # Creates a question
    response = client.post(url, json=data)
    assert response.content_type == "application/json"

    # Checks if question was created
    question = Question.objects.get(id=response.data["id"])
    assert question is not None

    # Check if answers were created
    assert len(question.answers.all()) == 2

    # TODO: The data tests should be using a serializer to check if the data is correct

    # Check if answers data is correct
    for answer in question.answers.all():
        assert answer.text in [data["answers"][0]["text"], data["answers"][1]["text"]]
        assert answer.correct in [
            data["answers"][0]["correct"],
            data["answers"][1]["correct"],
        ]

    # Check if question has the correct data
    assert question.text == data["text"]
    assert question.resolution == data["resolution"]
    assert question.subject == data["subject"]
    assert question.subsubject == data["subsubject"]
    assert question.year == data["year"]
    assert question.source == data["source"]


def test_create_question_group():
    # Tests if question group is created
    pass


def add_questions_to_group():
    # Tests if questions are added to group
    pass
