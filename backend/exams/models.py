from os import extsep, rename
from django.db import models
from django.db.models.fields.related import ForeignKey
from datetime import date
from django.contrib.auth.models import User

# Create your models here.
# TODO: Create Question, Exam models

"""
Talvez passar estas constantes para models e otimizar a procura de questoes
por dificuldade, disciplina, ano ou matéria
"""

EASY, MEDIUM, HARD = "Fácil", "Média", "Difícil"
MATH, PHYSICS = "Matemática", "Física-Química"
GEOMETRY, IMAGINARY = "Geometria", "Imaginários"

DIFFICULTIES = (
    (EASY, "Fácil"),
    (MEDIUM, "Média"),
    (HARD, "Difícil")
)

SUBJECTS = (
   (MATH, "Matemática"),
   (PHYSICS, "Física-Química")
)

SUB_SUBJECTS = (
    (GEOMETRY, "Geometria"),
    (IMAGINARY, "Imaginários"),
    ("Etc", "Etc")
)

YEARS = [(0, "0"), (10, "10"), (11, "11"), (12, "12")]

class Exam(models.Model):

    questions = models.ManyToManyField("Question", related_name="questions")
    failed = models.ManyToManyField("Question", related_name="failed", blank=True) # Questions that were responded incorrectlty
    correct = models.ManyToManyField("Question", related_name="correct", blank=True) # Questions that were responded correctlty
    score = models.IntegerField(default=0) # 0 - 200
    subject = models.CharField(max_length=50,  null=False, choices=SUBJECTS) # Math, Physics ...
    year = models.IntegerField(default=0, null=False, choices=YEARS) # Geral: 0; 12º: 12...
    difficulty = models.CharField(max_length=10, null=True, choices=DIFFICULTIES)

    #String representation
    def __str__(self): return "{}-{}-{}".format(self.subject, self.year, self.difficulty)


def renameImage(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "question{}.{}".format(instance.pk, ext)


class Question(models.Model):
    text = models.CharField(max_length=1000,  null=False)
    subject = models.CharField(max_length=50,  null=False, choices=SUBJECTS) # Math, Physics ...
    subsubject = models.CharField(max_length=50,  null=False, choices=SUB_SUBJECTS)# Geometry, Imaginary
    year = models.IntegerField(default=0, null=False, choices=YEARS) # Geral: 0; 12º: 12...
    difficulty = models.CharField(max_length=10, null=True, choices=DIFFICULTIES)
    image = models.ImageField(null=True, blank=True, upload_to=renameImage)

    #String representation
    def __str__(self): return "{}-{}-{}".format(self.id,self.subsubject, self.year, self.difficulty)

    def correctAnswer(self):
        return self.answer.get(question=self, correct=True)

    def wrongAnswers(self):
        return self.answer.filter(correct=False)

    def getComments(self):
        return self.comment.all()


class Comment(models.Model):
    question = models.ForeignKey("question", related_name="comment", on_delete=models.CASCADE, null=False)
    content = models.CharField(max_length=250, null=False)
    # When user delets account, comment shouldn't be deleted, but signaled as "deleted user" or equivalent
    author = models.ForeignKey(User, related_name="comment", on_delete=models.CASCADE, null=False)
    #fatherComment = models.ForeignKey("comment", related_name="reply", on_delete=models.CASCADE, null=True)
    votes = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)
    upvoters = models.ManyToManyField(User, related_name="upvoters", blank=True)
    downvoters = models.ManyToManyField(User, related_name="downvoters" ,blank=True)

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
    text = models.TextField(max_length=100,null=False)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey("question", related_name="answer", on_delete=models.CASCADE, null=True)
