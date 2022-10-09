from django.db import models
from django.contrib.auth.models import User
from django.db.models import indexes
from exams.models import Question
from django.dispatch import receiver
from django.db.models.signals import post_save, m2m_changed, pre_save
from datetime import datetime
from django.core.mail import send_mail
from django.template.loader import render_to_string
import random
from datetime import datetime
from config import subjects


# Create your models here.
# Create Profile model.

SUBJECTS = [(i['name'], i['name']) for i in subjects]
GERAL = 'Geral'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subjects = models.ManyToManyField("SubjectInfo", related_name='profile')
    xp = models.ForeignKey("XPSystem", default=1, on_delete=models.CASCADE)
    achievements = models.ManyToManyField("Achievement", related_name="achievements", blank=True)
    follows = models.ManyToManyField(User, "follows", blank=True)
    email_confirmation_code = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)
    last_activity = models.DateField(auto_now=True)

    def __str__(self):
        return self.user.username

    def addToFollowing(self, profile):
        self.follows.add(profile)

    def removeFromFollowing(self, profile):
        self.follows.remove(profile)


class XPSystem(models.Model):
    xp = models.IntegerField(default=0)
    total_xp = models.IntegerField(default=0)
    currentLevel = models.IntegerField(default=0)
    levelXP = models.IntegerField(default=1000)

    # This var will keep track of the value of xp before it is changed
    previousXP = 0

    def __init__(self, *args, **kwargs):
        super(XPSystem, self).__init__(*args, **kwargs)
        self.previousXP = self.xp

    def save(self, *args, **kwargs):
        if self.previousXP < self.xp:
            profile = self.profile_set.all()[0]
            user = profile.user
            amountXPChanged = self.xp-self.previousXP

            self.total_xp += amountXPChanged

            # Only increments streak if user hasn't gained XP today
            today = datetime.now()
            if not(profile.last_activity.year == today.year and profile.last_activity.month == today.month and profile.last_activity.day == today.day):
                profile.streak += 1
                profile.save()

            XPEvent.objects.create(user=user, amount=amountXPChanged)

            self.previousXP = self.xp

        if self.xp >= self.levelXP:
            self.xp -= self.levelXP
            self.currentLevel += 1
            self.levelXP *= 1.5

        super(XPSystem, self).save(*args, **kwargs)


def renameImage(instance, filename):
        ext = filename.split(".")[-1]
        if instance.pk:
            return "achievement{}.{}".format(instance.pk, ext)



class Achievement(models.Model):
    xp = models.IntegerField()
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    image = models.ImageField(null=True, blank=True, upload_to=renameImage, default="default_achievement.png")
    subject = models.CharField(default=GERAL, choices=SUBJECTS, max_length=50, blank=True)

    def __str__(self):
        return self.title

class AnswerInfo(models.Model):
    answer = models.ForeignKey(Question, on_delete=models.CASCADE)
    counter = models.IntegerField(default=1)
        

class SubjectInfo(models.Model):
    subject = models.CharField(max_length=50, null=False, choices=SUBJECTS)
    examCounter = models.IntegerField(default=0)
    wrongAnswers = models.ManyToManyField("AnswerInfo", blank=True, related_name="wrongAnswers")
    correctAnswers = models.ManyToManyField("AnswerInfo", blank=True, related_name="correctAnswers")
    index = models.IntegerField(default=0)

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
        self.index = self.getIndex()

    
    def addWrongAnswer(self, answer):
        wrongAnswers = self.wrongAnswers.all()

        for i in wrongAnswers:
            if i == answer:
                i.counter += 1
                i.save()
                return 

        newAnswer = AnswerInfo.objects.create(answer=answer)
        self.wrongAnswers.add(newAnswer)
        self.index = self.getIndex()

    
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



class XPEvent(models.Model):
    date = models.DateField(auto_now_add=True)
    amount = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self): return self.user.username + "::" + self.date.strftime("%m/%d/%Y") + ">" + str(self.amount)

# When a new User object is created, a Profile is attached
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        subject = SubjectInfo.objects.create(subject="Matemática")

        profile = Profile.objects.create(user=instance, xp=XPSystem.objects.create())

        # Generate random code to confirm email
        code = random.randint(100000, 999999)
        profile.email_confirmation_code = code

        # Send email to confirm account
        email_template = render_to_string("account/email/email_confirmation_message.txt", {
                'code': code,
                'user': instance
            })

        send_mail(
            "[Arquimedia] Confirma a Tua Conta Por Favor",
            email_template,
            "geral@arquimedia.pt",
            (instance.email,),
            fail_silently=False,
        )

        profile.subjects.add(subject)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Changes the XP value each time an achievement is added or removed from a user
@receiver(m2m_changed, sender=Profile.achievements.through)
def updateXP(sender, instance, action, **kwargs):

    # Increments XP when new achievements are added
    if action == 'pre_add':
        pk_set = kwargs.pop("pk_set", None)
        for pk in pk_set:
            achievement = Achievement.objects.get(id=pk)
            instance.xp.xp += achievement.xp
            instance.xp.save()

    # Decrements XP when new achievements are removed
    if action == 'pre_remove':
        pk_set = kwargs.pop("pk_set", None)
        for pk in pk_set:
            achievement = Achievement.objects.get(id=pk)
            instance.xp.xp -= achievement.xp
            instance.xp.save()

