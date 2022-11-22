import factory

from django.contrib.auth.models import User
from exams.models import Answer, Question
from users.models import Achievement, AnswerInfo

from faker import Faker

faker = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("username",)

    username = faker.name()
    password = faker.password()
    email = faker.email()


class AnswerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Answer

    text = faker.text()
    correct = faker.boolean()
    question = factory.SubFactory("tests.factories.QuestionFactory")


class QuestionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Question

    text = faker.text(max_nb_chars=100)
    author = factory.SubFactory("tests.factories.UserFactory")
    accepted = False
    subject = faker.random_choices(
        elements=[
            "Matemática",
            "Física",
        ],
        length=1,
    )[0]
    resolution = faker.text(max_nb_chars=500)
    subsubject = factory.LazyAttribute(lambda a: faker.text(max_nb_chars=10))
    year = factory.LazyAttribute(
        lambda a: faker.random_choices(elements=[0, 10, 11, 12], length=1)[0]
    )
    difficulty = faker.random_choices(elements=["Fácil", "Média", "Difícil"], length=1)[
        0
    ]
    source = faker.text()
    date = faker.date()


class AchievementFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Achievement

    title = faker.text(max_nb_chars=10)
    description = faker.text(max_nb_chars=100)
    xp = faker.random_int(min=0, max=1000)
    subject = faker.random_choices(
        elements=["Matemática", "Física"],
        length=1,
    )[0]


class AnswerInfoFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = AnswerInfo

    answer = factory.SubFactory("tests.factories.QuestionFactory")
    counter = faker.random_int(min=0, max=100)
