from exams.models import Report
from users.models import Achievement, AnswerInfo, Profile, SubjectInfo, XPEvent, XPSystem
from django.db.models import fields
from rest_framework.fields import ReadOnlyField
from exams.models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from config import subjects
from rest_framework.fields import CurrentUserDefault
import os

SUBJECT_CHOICES = [(i['name'], i['name']) for i in subjects if i['active']]


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SlugField()
    username = serializers.ReadOnlyField()
    mod = serializers.BooleanField(source="is_staff")
    admin = serializers.BooleanField(source="is_superuser")
    profile = serializers.IntegerField(source='profile.id')

    class Meta:
        model = User
        fields = ("id", "profile", "username", "email", "mod", "admin")

    def get_profile(self):
        profile = Profile.objects.get(user=self.id)


class XPEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = XPEvent
        fields = ("date", "amount")


class QuestionShortSerializer(serializers.ModelSerializer):
    id = serializers.SlugField()

    class Meta:
        model = Question
        fields = ("id", )


class CommentSerializer(serializers.ModelSerializer):
    voted = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = ("id", "content", "author", "votes",
                  "voted", "date", "question")

    def get_voted(self, obj):
        current_user = self.context.user
        comment = obj

        if current_user in comment.upvoters.all():
            return 1

        if current_user in comment.downvoters.all():
            return -1

        return 0


class CommentCreateSerializer(serializers.Serializer):
    content = serializers.CharField()
    question = serializers.IntegerField()


class CommentVoteChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("votes", )


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ("id", "text", "correct")


class ResourceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Resource
        fields = ("id", "description", "url", "type")


class QuestionSerializer(serializers.ModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)
    answer = AnswerSerializer(many=True)
    image = serializers.SerializerMethodField()
    resources = ResourceSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id", "text", "resolution", "subject", "subsubject", "year",
                  "difficulty", "comment", "answer", "image", "source", "date", "resources")

    def getAnswers(self, question):
        return [answer for answer in question.answer.all]

    def get_image(self, obj):
        address = os.getenv("ALLOWED_HOST", "localhost:" +
                            str(os.getenv("DJANGO_PORT", 8000)))

        # cursed
        if os.getenv("DJANGO_DEBUG") == "False":
            address += "/api"

        if str(obj.image):
            return "http://" + address + "/images/" + str(obj.image)

        return None


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    failed = QuestionSerializer(many=True)
    correct = QuestionSerializer(many=True)

    class Meta:
        model = Exam
        fields = ("id", "questions", "failed", "correct",
                  "score", "subject", "year", "difficulty")


class CreateExamSerializer(serializers.Serializer):
    subject = serializers.ChoiceField(choices=SUBJECT_CHOICES)
    subSubjects = serializers.ListField(child=serializers.CharField())
    year = serializers.ListField(child=serializers.IntegerField())
    randomSubSubject = serializers.BooleanField()


class CreateRecommendedExamSerializer(serializers.Serializer):
    subject = serializers.ChoiceField(choices=SUBJECT_CHOICES)


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"


class XPSerializer(serializers.ModelSerializer):
    class Meta:
        model = XPSystem
        fields = ("xp", "currentLevel", "levelXP")


class answersInfoSerializer(serializers.ModelSerializer):
    answer = QuestionShortSerializer()

    class Meta:
        model = AnswerInfo
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    wrongAnswers = answersInfoSerializer(many=True)
    correctAnswers = answersInfoSerializer(many=True)

    class Meta:
        model = SubjectInfo
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer(many=True)
    xp = XPSerializer()
    user = UserSerializer()
    subjects = SubjectSerializer(many=True)
    follows = UserSerializer(many=True)

    class Meta:
        model = Profile
        fields = ("user", "subjects", "xp", "achievements",
                  "follows", "streak", "last_activity")


class AnswerSubmitionSerializer(serializers.Serializer):
    text = serializers.CharField()
    correct = serializers.BooleanField()


class CreateQuestionSerializer(serializers.Serializer):
    text = serializers.CharField()
    resolution = serializers.CharField(required=False, allow_blank=True)
    subsubject = serializers.CharField()
    subject = serializers.CharField()
    year = serializers.IntegerField()
    answers = serializers.ListField(child=AnswerSerializer())
    source = serializers.CharField(required=False, allow_blank=True)


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()


class SubjectInfoSerializer(serializers.Serializer):
    subject = serializers.CharField()
    questions = QuestionShortSerializer(many=True)


class ProfileLeaderboardSerializer(serializers.ModelSerializer):
    xp = XPSerializer()

    class Meta:
        model = Profile
        fields = ("id", "xp")


class ProfileLeaderboardTimedSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    xp = serializers.IntegerField()


class LeaderboardSerializer(serializers.Serializer):
    users = ProfileLeaderboardTimedSerializer(many=True)
    length = serializers.IntegerField()


class DeleteAccountSerializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        password = attrs.get('password')
        user = self.context.get("request").user

        if not user.check_password(password):
            err_msg = (
                "Your old password was entered incorrectly. Please enter it again.")
            raise serializers.ValidationError(err_msg)

        user.delete()

        return password


class ReportSerializer(serializers.ModelSerializer):

	id = serializers.SlugField(read_only=True)
	date = serializers.DateTimeField(read_only=True)
	author = serializers.CharField(source='author.username', read_only=True)
	class Meta:
		model = Report
		fields = ['id', 'question', 'date', 'type', 'body', 'author']


class CreateReportSerializer(serializers.ModelSerializer):
    body = serializers.CharField(
        required=False, allow_blank=True)

    class Meta:
        model = Report
        fields = ['question', 'type', 'body']


class QuestionGroupSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, source="questions")

    class Meta:
        model = QuestionGroup
        fields = ("id", "text", "questions")