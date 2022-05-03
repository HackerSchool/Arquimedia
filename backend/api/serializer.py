from users.models import Achievement, AnswerInfo, Profile, SubjectInfo, XPEvent, XPSystem
from django.db.models import fields
from rest_framework.fields import ReadOnlyField
from exams.models import Question, Comment, Exam, Answer
from django.contrib.auth.models import User 
from rest_framework import serializers
from config import subjects

SUBJECT_CHOICES = [(i['name'], i['name']) for i in subjects if i['active']]
class UserSerializer(serializers.ModelSerializer):
	id = serializers.SlugField()
	username = serializers.ReadOnlyField()
	mod = serializers.BooleanField(source="is_staff")
	admin = serializers.BooleanField(source="is_superuser")

	class Meta:
		model = User
		fields = ("id", "username", "email", "mod", "admin")


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
	author = UserSerializer(many=False)
	question = QuestionShortSerializer(many=False)


	class Meta:
		model = Comment
		fields = ("id", "content", "author", "votes", "date", "question")

	def create(self, validated_data):
		content = validated_data["content"]
		author = User.objects.get(id=validated_data["author"]["id"])
		question = Question.objects.get(id=validated_data["question"]["id"])
		comment = Comment.objects.create(
			content=content,
			author=author,
			question=question
		)
		return comment


class CommentVoteChangeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comment
		fields = ("votes", )


class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Answer
		fields = ("id", "text", "correct")


class QuestionSerializer(serializers.ModelSerializer):
	comment = CommentSerializer(many=True, read_only=True)
	answer = AnswerSerializer(many=True)

	class Meta:
		model = Question
		fields = ("id", "text", "subject", "subsubject", "year", "difficulty", "comment", "answer", "image", "source", "date")

	def getAnswers(self, question):
		return [answer for answer in question.answer.all]


class ExamSerializer(serializers.ModelSerializer):
	questions = QuestionSerializer(many=True)
	failed = QuestionSerializer(many=True)
	correct = QuestionSerializer(many=True)

	class Meta: 
		model = Exam
		fields = ("id", "questions", "failed", "correct", "score", "subject", "year", "difficulty")

class CreateExamSerializer(serializers.Serializer):
	subject = serializers.ChoiceField(choices=SUBJECT_CHOICES)
	subSubjects = serializers.ListField(child = serializers.CharField())
	year = serializers.ListField(child = serializers.IntegerField())
	randomSubSubject = serializers.BooleanField()


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
		fields = ("user", "subjects", "xp", "achievements", "follows", "streak", "last_activity")


class AnswerSubmitionSerializer(serializers.Serializer):
	text = serializers.CharField()
	correct = serializers.BooleanField()


class CreateQuestionSerializer(serializers.Serializer):
	text = serializers.CharField()
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