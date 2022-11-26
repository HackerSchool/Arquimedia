import pytest

from django.urls import reverse

from .factories import QuestionFactory

from exams.models import Question


@pytest.mark.django_db
def test_create_exam(client):
    # Create enough question to generate an exam
    QuestionFactory.create_batch(10, subject="Matemática", accepted=True)
    QuestionFactory.create_batch(40, subject="Português", accepted=True)

    url = reverse("exam")

    data = {
        "subject": "Matemática",
        "subSubjects": [],
        "year": [],
        "randomSubSubject": True,
    }

    response = client.post(url, data=data, format="json")

    # Check if all questions are from the same subject
    for question in response.data["questions"]:
        assert question["subject"] == "Matemática"

    # Check if there are no repetitions
    questions_ids = [question["id"] for question in response.data["questions"]]
    assert len(questions_ids) == len(set(questions_ids))

    assert response.status_code == 201
    assert len(response.data["questions"]) == 10


@pytest.mark.django_db
def test_create_recommended_exam(client):
    # Create enough question to generate an exam
    QuestionFactory.create_batch(200, subject="Matemática", accepted=True)
    QuestionFactory.create_batch(200, subject="Português", accepted=True)

    url = reverse("recommended-exam")

    data = {
        "subject": "Matemática",
    }

    response = client.post(url, data=data, format="json")

    # Check if there are no repetitions
    questions_ids = [question["id"] for question in response.data["questions"]]
    assert len(questions_ids) == len(set(questions_ids))

    # Check if all questions are from the same subject
    for question in response.data["questions"]:
        assert question["subject"] == "Matemática"

    # Check if questions differ on year
    years = [question["year"] for question in response.data["questions"]]
    assert len(set(years)) != 1

    # Check if questions differ on subsubject
    sub_subjecs = [question["subsubject"] for question in response.data["questions"]]
    print(sub_subjecs)
    assert len(set(sub_subjecs)) != 1

    assert response.status_code == 201
    assert len(response.data["questions"]) == 10
