import pytest

from django.urls import reverse

from exams.models import Question
from api.serializer import QuestionSerializer

from pytest_common_subject import precondition_fixture
from pytest_assert_utils import assert_model_attrs

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


def test_create_question(json, UsesPostMethod, Returns201):
    # Tests if question is created
    url = reverse("question")

    data = {
        "text": "Example of question",
        "resolution": "Example of resolution",
        "answers": [
            {
                "id": 0,
                "text": "string",
                "correct": true
            }
        ],
        "subject": "math",
        "subsubject": "geometry",
        "year": 11,
        "source": ""
    }

    # Creates a question
    response = client.post(url, json=data)
    assert response.content_type == 'application/json'

    # Tests if endpoint creates one and only one KeyValue (record 
    # which KeyValue rows exist before the request, and compare them 
    # with the rows that exist after the request) 
    initial_key_value_ids = precondition_fixture(
    lambda:
        set(KeyValue.objects.values_list('id', flat=True)))

    def test_it_creates_new_key_value(initial_key_value_ids, json):
        expected = initial_key_value_ids | {json['id']}
        actual = set(KeyValue.objects.values_list('id', flat=True))
        assert expected == actual

    # Verifies that the newly-created KeyValue has exactly the field 
    # values we POSTed
    def test_it_sets_expected_attrs(response, json):
        key_value = KeyValue.objects.get(pk=json['id'])

        expected = response
        assert_model_attrs(key_value, expected)
    
    # Verifies the structure of the API response
    def test_it_returns_key_value(json):
        key_value = KeyValue.objects.get(pk=json['id'])

        expected = express_key_value(key_value)
        actual = json
        assert expected == actual

def test_create_question_group():
    # Tests if question group is created
    pass


def add_questions_to_group():
    # Tests if questions are added to group
    pass
