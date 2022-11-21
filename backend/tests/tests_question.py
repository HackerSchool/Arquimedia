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
        "text": "test",
        "answers": [
            {"text": "correct", "correct": True},
            {"text": "incorrect", "correct": False},
            {"text": "incorrectincorrect", "correct": False},
            {"text": "incorrect", "correct": False},
        ],
        "subject": "Matemática",
        "subsubject": "Geometria",
        "year": 10,
        "resolution": "teste",
        "source": "",
    }

    # Creates a question
    response = client.post(url, data=data, format="json")

    # Checks if question was created
    question = Question.objects.get(id=response.data["id"])
    assert question is not None

    # Check if answers were created
    assert len(question.answers.all()) == 4

    # TODO: The data tests should be using a serializer to check if the data is correct

    # Check if answers data is correct
    for i, answer in enumerate(question.answers.all()):
        assert answer.text == data["answers"][i]["text"]
        assert answer.correct == data["answers"][i]["correct"]

    # Check if question has the correct data
    assert question.text == data["text"]
    assert question.resolution == data["resolution"]
    assert question.subject == data["subject"]
    assert question.subsubject == data["subsubject"]
    assert question.year == data["year"]
    assert question.source == data["source"]
    assert question.accepted is False


@pytest.mark.django_db
def test_accept_question(superuser_client, question):
    url = reverse("question", kwargs={"id": question.id})

    response = superuser_client.put(url)

    question.refresh_from_db()

    assert response.status_code == 200
    assert question.accepted is True


@pytest.mark.django_db
def test_delete_question(admin_client, question):
    url = reverse("question", kwargs={"id": question.id})

    response = admin_client.delete(url)

    assert response.status_code == 200
    assert Question.objects.filter(id=question.id).count() == 0


def test_fill_in_the_blank_create():
    # TODO: Tests if fill in the blank question is created
    pass


def test_create_question_group():
    # Tests if question group is created
    pass


def add_questions_to_group():
    # Tests if questions are added to group
    pass
