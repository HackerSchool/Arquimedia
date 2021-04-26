from django.db import models
from django.contrib.auth.models import User
from exams.models import Answer

# Create your models here.
# Create Profile model.

SUBJECTS = (
   (MATH, "Matemática"),
   (PHYSICS, "Física-Química")
)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(SubjectInfo)


class AnswerInfo(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    counter = models.IntegerField(default=1)


class SubjectInfo(models.Model):
    subject = models.CharField(max_length=50, null=False, choices=SUBJECTS)
    examCounter = models.IntegerField(default=0)
    wrongAnswers = models.ManyToManyField(AnswerInfo, blank=True)
    correctAnswers = models.ManyToManyField(AnswerInfo, blank=True)
