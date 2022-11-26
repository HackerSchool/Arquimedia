from os import extsep, rename
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey
from datetime import date
from django.contrib.auth.models import User
from config import subjects
from exams.utils import *

# Create your models here.
# TODO: Create Question, Exam models

"""
Talvez passar estas constantes para models e otimizar a procura de questoes
por dificuldade, disciplina, ano ou matéria
"""

EASY, MEDIUM, HARD = "Fácil", "Média", "Difícil"

DIFFICULTIES = ((EASY, "Fácil"), (MEDIUM, "Média"), (HARD, "Difícil"))

SUBJECTS = [(i["name"], i["name"]) for i in subjects]

SUB_SUBJECTS = ((j, j) for i in subjects for j in i["themes"])

YEARS = [(0, "0"), (10, "10"), (11, "11"), (12, "12")]

RESOURCE_TYPES = (
    ("video", "Video"),
    ("paper", "Paper"),
)

ISSUE_TYPES = (
    ("Typo", "Gralha no enunciado ou nas opções de resposta"),
    ("SubmissionError", "Erro na submissão"),
    ("QuestionFormatting", "Pergunta desformatada"),
    ("LoadingError", "Página não carrega"),
    ("ImageError", "Figura errada ou em falta"),
    ("Other", "Outro"),
)

XP_PER_EXAM = 100
XP_PER_CORRECT_ANSWER = 10

class Exam(models.Model):

    questions = models.ManyToManyField("Question", related_name="questions")
    # Questions that were responded incorrectlty
    failed = models.ManyToManyField("Question", related_name="failed", blank=True)
    # Questions that were responded correctlty
    correct = models.ManyToManyField("Question", related_name="correct", blank=True)
    score = models.IntegerField(default=0)  # 0 - 200
    # Math, Physics ...
    subject = models.CharField(max_length=50, null=False, choices=SUBJECTS)
    # Geral: 0; 12º: 12...
    year = models.IntegerField(default=0, null=False, choices=YEARS)
    difficulty = models.CharField(max_length=10, null=True, choices=DIFFICULTIES)

    # String representation
    def __str__(self):
        return "{}-{}-{}".format(self.subject, self.year, self.difficulty)

    def correct(self, request):
        profileSubject = request.user.profile.subjects.get(subject=self.subject)
        profileSubject.examCounter += 1
        
        for question, answer in request.data.items():
            if "total_dropdowns" in question:
                questionQuery = FillInTheBlankQuestion.objects.get(id=int(question))
            else:
                questionQuery = Question.objects.get(id=int(question))
            
            questionQuery.correct(request, answer, profileSubject, self)

        request.user.profile.xp.xp += XP_PER_EXAM
        request.user.profile.xp.save()
        self.save()
        profileSubject.save()


class QuestionGroup(models.Model):
    text = models.CharField(max_length=10000, null=False)
    image = models.ImageField(null=True, blank=True, upload_to=rename_image_group)

    source = models.CharField(max_length=500, null=True)


class QuestionGroup(models.Model):
    text = models.CharField(max_length=2000, null=False, default=None)


class Question(models.Model):
    author = models.ForeignKey(
        User, related_name="question", null=True, on_delete=CASCADE
    )
    accepted = models.BooleanField(null=True, default=False)
    text = models.CharField(max_length=1000, null=True)
    resolution = models.TextField(null=True)
    # Math, Physics ...
    subject = models.CharField(max_length=50, null=False, choices=SUBJECTS)
    subsubject = models.CharField(
        max_length=50, null=False, choices=SUB_SUBJECTS
    )  # Geometry, Imaginary
    # Geral: 0; 12º: 12...
    year = models.IntegerField(default=0, null=False, choices=YEARS)
    difficulty = models.CharField(max_length=10, null=True, choices=DIFFICULTIES)
    image = models.ImageField(null=True, blank=True, upload_to=rename_image_question)
    source = models.CharField(max_length=500, null=True)
    date = models.DateField(auto_now_add=True)
    group = models.ForeignKey(
        QuestionGroup,
        on_delete=CASCADE,
        related_name="questions",
        null=True,
        default=None,
    )

    # String representation
    def __str__(self):
        return "{}-{}-{}".format(self.id, self.subsubject, self.year, self.difficulty)

    def correct_answer(self):
        return self.answers.get(question=self, correct=True)

    def wrong_answers(self):
        return self.answers.filter(correct=False)

    def get_comments(self):
        return self.comment.all()
    
    def correct(self, request, answer, profileSubject, exam):
        if int(answer) != 0:
            if "dropdown_number" in answer:
                answerQuery = FillInTheBlankAnswer.objects.get(id=int(answer))
            else:
                answerQuery = Answer.objects.get(id=int(answer))

            if answerQuery.correct:
                profileSubject.add_correct_answer(self)
                exam.correct.add(self)

                request.user.profile.xp.xp += XP_PER_CORRECT_ANSWER
                exam.score += 20

            else:
                profileSubject.addWrongAnswer(self)
                exam.failed.add(self)

        else:
            profileSubject.addWrongAnswer(self)
            exam.failed.add(self)


class Comment(models.Model):
    question = models.ForeignKey(
        "question", related_name="comment", on_delete=models.CASCADE, null=False
    )
    content = models.CharField(max_length=250, null=False)
    # When user delets account, comment shouldn't be deleted, but signaled as "deleted user" or equivalent
    author = models.ForeignKey(
        User, related_name="comment", on_delete=models.CASCADE, null=False
    )
    # fatherComment = models.ForeignKey("comment", related_name="reply", on_delete=models.CASCADE, null=True)
    votes = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    upvoters = models.ManyToManyField(User, related_name="upvoters", blank=True)
    downvoters = models.ManyToManyField(User, related_name="downvoters", blank=True)

    def upvote(self, user):
        """Upvotes a comment. Returns 1 if done successfully, 0 if not"""

        if user in self.upvoters.all():
            return 0
        if user in self.downvoters.all():
            self.downvoters.remove(user)

        self.votes += 1
        self.upvoters.add(user)
        self.save()

        return 1

    def downvote(self, user):
        """Downvotes a comment. Returns 1 if done successfully, 0 if not"""

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
        "question", related_name="answers", on_delete=models.CASCADE, null=True
    )


class Report(models.Model):
    question = models.ForeignKey(
        "question", related_name="report", on_delete=models.CASCADE, null=False
    )
    author = models.ForeignKey(
        User, related_name="report", on_delete=models.CASCADE, null=False
    )
    date = models.DateTimeField(auto_now_add=True)

    type = models.CharField(max_length=50, choices=ISSUE_TYPES)
    body = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.date.date()) + " || " + self.type + " || " + str(self.question)


class Resource(models.Model):
    type = models.CharField(null=False, choices=RESOURCE_TYPES, max_length=50)
    url = models.TextField(null=False)
    description = models.TextField(null=False)
    question = models.ForeignKey(Question, on_delete=CASCADE, related_name="resources")


class FillInTheBlankQuestion(Question):
    total_dropdowns = models.IntegerField(default=2)


class FillInTheBlankAnswer(models.Model):
    text = models.TextField(max_length=100, null=False)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(
        "fillintheblankquestion",
        related_name="fillintheblank_answers",
        on_delete=models.CASCADE,
        null=True,
    )
    dropdown_number = models.IntegerField()
