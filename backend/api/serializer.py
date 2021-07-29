from django.db.models import fields
from rest_framework.fields import ReadOnlyField
from exams.models import Question, Comment, Exam
from django.contrib.auth.models import User 
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
	id = serializers.SlugField()
	username = serializers.ReadOnlyField()
	
	class Meta:
		model = User
		fields = ("id", "username", )


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


class QuestionSerializer(serializers.ModelSerializer):
	comment = CommentSerializer(many=True, read_only=True)

	class Meta:
		model = Question
		fields = ("id", "text", "subject", "subsubject", "year", "difficulty", "comment")


class ExamSerializer(serializers.ModelSerializer):
	questions = QuestionSerializer(many=True)
	failed = QuestionSerializer(many=True)
	correct = QuestionSerializer(many=True)

	class Meta: 
		model = Exam
		fields = ("questions", "failed", "correct", "score", "subject", "year", "difficulty")


class StringListField(serializers.ListField):
	child = serializers.CharField()


class CreateExamSerializer(serializers.Serializer):
	subject = serializers.CharField()
	randomSubSubject = serializers.BooleanField()
	subSubjects = StringListField()
	year = serializers.IntegerField()

