from django.db import models

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

YEARS = [(0,"0"), (10, "10"), (11, "11"), (12, "12")]

class Exam(models.Model):

    # question = models.ManyToManyField(Question)
    # answers = models.ManyToManyField(Question)
    # wrongAnswers = models.ManyToManyField(Question)
    # correctAnswers = models.ManyToManyField(Question)
    score = models.IntegerField(default=0) # 0 - 200
    subject = models.CharField(max_length=50,  null=False, choices=SUBJECTS) # Math, Physics ...
    year = models.IntegerField(default=0, null=False, choices=YEARS) # Geral: 0; 12º: 12...
    difficulty = models.CharField(max_length=10, null=True, choices=DIFFICULTIES)

    #String representation
    def __str__(self): return "{}-{}-{}".format(self.subject, self.year, self.difficulty)
