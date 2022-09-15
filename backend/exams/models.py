from os import extsep, rename
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey
from datetime import date
from django.contrib.auth.models import User
from config import subjects

# Create your models here.
# TODO: Create Question, Exam models

"""
Talvez passar estas constantes para models e otimizar a procura de questoes
por dificuldade, disciplina, ano ou matéria
"""

EASY, MEDIUM, HARD = "Fácil", "Média", "Difícil"

DIFFICULTIES = (
    (EASY, "Fácil"),
    (MEDIUM, "Média"),
    (HARD, "Difícil")
)

SUBJECTS = [(i['name'], i['name']) for i in subjects]

SUB_SUBJECTS = ((j, j) for i in subjects for j in i['themes'])

YEARS = [(0, "0"), (10, "10"), (11, "11"), (12, "12")]

RESOURCE_TYPES = (
    ("video", "Video"),
    ("paper", "Paper"),
)

ISSUE_TYPES = (
    ('Typo', 'Gralha no enunciado ou nas opções de resposta'),
    ('SubmissionError', 'Erro na submissão'),
    ('QuestionFormatting', 'Pergunta desformatada'),
    ('LoadingError', 'Página não carrega'),
    ('ImageError', 'Figura errada ou em falta'),
    ('Other', 'Outro'),
)


class Exam(models.Model):

    questions = models.ManyToManyField("Question", related_name="questions")
    # Questions that were responded incorrectlty
    failed = models.ManyToManyField(
        "Question", related_name="failed", blank=True)
    # Questions that were responded correctlty
    correct = models.ManyToManyField(
        "Question", related_name="correct", blank=True)
    score = models.IntegerField(default=0)  # 0 - 200
    # Math, Physics ...
    subject = models.CharField(max_length=50,  null=False, choices=SUBJECTS)
    # Geral: 0; 12º: 12...
    year = models.IntegerField(default=0, null=False, choices=YEARS)
    difficulty = models.CharField(
        max_length=10, null=True, choices=DIFFICULTIES)

    # String representation
    def __str__(self): return "{}-{}-{}".format(self.subject,
                                                self.year, self.difficulty)


class Question(models.Model):
    author = models.ForeignKey(
        User, related_name="question", null=True, on_delete=CASCADE)
    accepted = models.BooleanField(null=True, default=False)
    text = models.CharField(max_length=1000,  null=False)
    resolution = models.TextField(null=True)
    # Math, Physics ...
    subject = models.CharField(max_length=50,  null=False, choices=SUBJECTS)
    subsubject = models.CharField(
        max_length=50,  null=False, choices=SUB_SUBJECTS)  # Geometry, Imaginary
    # Geral: 0; 12º: 12...
    year = models.IntegerField(default=0, null=False, choices=YEARS)
    difficulty = models.CharField(
        max_length=10, null=True, choices=DIFFICULTIES)
    image = models.ImageField(null=True, blank=True, upload_to=self.rename_image)
    source = models.CharField(max_length=500, null=True)
    date = models.DateField(auto_now_add=True)

    # String representation
    def __str__(self): return "{}-{}-{}".format(self.id,
                                                self.subsubject, self.year, self.difficulty)

    def correctAnswer(self):
        return self.answer.get(question=self, correct=True)

    def wrongAnswers(self):
        return self.answer.filter(correct=False)

    def getComments(self):
        return self.comment.all()

    def rename_image(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "question{}.{}".format(instance.pk, ext)



class QuestionGroup(models.Model):
    text = models.CharField(max_length=10000,  null=False)
    image = models.ImageField(null=True, blank=True, upload_to=rename_image)

    source = models.CharField(max_length=500, null=True)

    def rename_image(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "group{}.{}".format(instance.pk, ext)


class Comment(models.Model):
    question = models.ForeignKey(
        "question", related_name="comment", on_delete=models.CASCADE, null=False)
    content = models.CharField(max_length=250, null=False)
    # When user delets account, comment shouldn't be deleted, but signaled as "deleted user" or equivalent
    author = models.ForeignKey(
        User, related_name="comment", on_delete=models.CASCADE, null=False)
    #fatherComment = models.ForeignKey("comment", related_name="reply", on_delete=models.CASCADE, null=True)
    votes = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    upvoters = models.ManyToManyField(
        User, related_name="upvoters", blank=True)
    downvoters = models.ManyToManyField(
        User, related_name="downvoters", blank=True)

    def upvote(self, user):
        """ Upvotes a comment. Returns 1 if done successfully, 0 if not """

        if user in self.upvoters.all():
            return 0
        if user in self.downvoters.all():
            self.downvoters.remove(user)

        self.votes += 1
        self.upvoters.add(user)
        self.save()

        return 1

    def downvote(self, user):
        """ Downvotes a comment. Returns 1 if done successfully, 0 if not """

        if user in self.downvoters.all():
            return 0
        if user in self.upvoters.all():
            self.upvoters.remove(user)

        self.votes -= 1
        self.downvoters.add(user)
        self.save()

        return 1


class Answer(models.Model):
    text = models.TextField(max_length=100, null=False)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(
        "question", related_name="answer", on_delete=models.CASCADE, null=True)


class Report(models.Model):
    question = models.ForeignKey(
        "question", related_name="report", on_delete=models.CASCADE, null=False)
    author = models.ForeignKey(
        User, related_name="report", on_delete=models.CASCADE, null=False)
    date = models.DateTimeField(auto_now_add=True)

    type = models.CharField(max_length=50, choices=ISSUE_TYPES)
    body = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.date.date()) + ' || ' + self.type + ' || ' + str(self.question)


class Resource(models.Model):
    type = models.CharField(null=False, choices=RESOURCE_TYPES, max_length=50)
    url = models.TextField(null=False)
    description = models.TextField(null=False)
    question = models.ForeignKey(
        Question, on_delete=CASCADE, related_name="resources")
