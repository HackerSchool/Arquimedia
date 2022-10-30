import factory

from django.contrib.auth.models import User
from exams.models import Answer, Question

from faker import Faker

faker = Faker()


class userFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = faker.name()
    password = faker.password()
    email = faker.email()


class answerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Answer

    text = faker.text()
    correct = faker.boolean()
    question = factory.SubFactory("exams.factories.questionFactory")


class questionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Question
        exclude = ("accepted",)

    text = faker.text()
    author = factory.SubFactory("exams.factories.userFactory")
    accepted = faker.boolean()
    subject = faker.random_choices(
        elements=[
            "Matemática",
            "Biologia",
            "Física",
            "Química",
            "Português",
            "Geografia",
            "História",
            "Inglês",
            "Espanhol",
            "Filosofia",
        ]
    )
    resolution = faker.text()
    subsubject = faker.text()
    year = faker.random_choices(elements=[0, 10, 11, 12])
    difficulty = faker.random_choices(elements=["Fácil", "Média", "Difícil"])
    source = faker.text()
    date = faker.date()
