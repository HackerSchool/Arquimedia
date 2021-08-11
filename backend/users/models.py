from django.db import models
from django.contrib.auth.models import User
from django.db.models import indexes
from exams.models import Question
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.
# Create Profile model.

MATH, PHYSICS = "Matemática", "Física-Química"

SUBJECTS = (
   (MATH, "Matemática"),
   (PHYSICS, "Física-Química")
)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subjects = models.ManyToManyField("SubjectInfo")
    xp = models.ForeignKey("XPSystem", default=1, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class XPSystem(models.Model):
    xp = models.IntegerField(default=0)
    currentLevel = models.IntegerField(default=0)
    levelXP = models.IntegerField(default=1000)

    def save(self, *args, **kwargs):
        if self.xp >= self.levelXP:
            self.xp -= self.levelXP
            self.currentLevel += 1
            self.levelXP *= 1.5

        super(XPSystem, self).save(*args, **kwargs)


class AnswerInfo(models.Model):
    answer = models.ForeignKey(Question, on_delete=models.CASCADE)
    counter = models.IntegerField(default=1)
        

class SubjectInfo(models.Model):
    subject = models.CharField(max_length=50, null=False, choices=SUBJECTS)
    examCounter = models.IntegerField(default=0)
    wrongAnswers = models.ManyToManyField("AnswerInfo", blank=True, related_name="wrongAnswers")
    correctAnswers = models.ManyToManyField("AnswerInfo", blank=True, related_name="correctAnswers")

    def __str__(self):
        return self.subject


    def addCorrectAnswer(self, answer):
        correctAnswers = self.correctAnswers.all()

        for i in correctAnswers:
            if i == answer:
                i.counter += 1
                i.save()
                return 

        newAnswer = AnswerInfo.objects.create(answer=answer)
        self.correctAnswers.add(newAnswer)

    
    def addWrongAnswer(self, answer):
        wrongAnswers = self.wrongAnswers.all()

        for i in wrongAnswers:
            if i == answer:
                i.counter += 1
                i.save()
                return 

        newAnswer = AnswerInfo.objects.create(answer=answer)
        self.wrongAnswers.add(newAnswer)

    
    def getPercentageOfQuestionsAnswered(self):
        """ Returns percentage of questions answered by an user """

        total = Question.objects.count()
        if (total == 0): return 0

        answered = self.wrongAnswers.count() + self.correctAnswers.count()

        return round(answered / total * 100, 2)

    
    def getIndex(self):
        """ Returns success index that gives a rough idea of how prepared the user is """
        x = self.correctAnswers.count() / 5 - 30
        
        if(x < 0): index = 13.75 * -(abs(x) ** (1 / 3)) + 42.5
        else: index = 13.75 * x ** (1 / 3) + 42.5

        if index < 0: return 0
        if index > 100: return 100

        return index



# When a new User object is created, a Profile is attached
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, level=XPSystem.objects.create())

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

