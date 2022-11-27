from exams.models import Report
from users.models import (
    Achievement,
    AnswerInfo,
    Profile,
    SubjectInfo,
    XPEvent,
    XPSystem,
)
from django.db.models import fields
from rest_framework.fields import ReadOnlyField
from rest_framework.exceptions import ValidationError
from exams.models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from config import subjects
from rest_framework.fields import CurrentUserDefault
import os

import random

SUBJECT_CHOICES = [(i["name"], i["name"]) for i in subjects if i["active"]]
QUESTION_PER_EXAM = 10


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SlugField()
    username = serializers.ReadOnlyField()
    mod = serializers.BooleanField(source="is_staff")
    admin = serializers.BooleanField(source="is_superuser")
    profile = serializers.IntegerField(source="profile.id")

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
        fields = ("id",)


class CommentSerializer(serializers.ModelSerializer):
    voted = serializers.SerializerMethodField()
    author = UserSerializer()

    class Meta:
        model = Comment
        fields = ("id", "content", "author", "votes", "voted", "date", "question")

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
        fields = ("votes",)


class AnswerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Answer
        fields = ("id", "text", "correct")


class ResourceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Resource
        fields = ("id", "description", "url", "type")


class QuestionGroupSerializer(serializers.ModelSerializer):
    text = serializers.CharField()

    class Meta:
        model = QuestionGroup
        fields = ("id", "text", "questions")


class QuestionSerializer(serializers.ModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)
    answers = AnswerSerializer(many=True)
    image = serializers.SerializerMethodField()
    resources = ResourceSerializer(many=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "text",
            "resolution",
            "subject",
            "subsubject",
            "year",
            "difficulty",
            "comment",
            "answers",
            "image",
            "source",
            "date",
            "resources",
            "group",
        )

    def get_answers(self, question):
        return [answer for answer in question.answers.all]

    def get_image(self, obj):
        address = os.getenv(
            "ALLOWED_HOST", "localhost:" + str(os.getenv("DJANGO_PORT", 8000))
        )

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
        fields = (
            "id",
            "questions",
            "failed",
            "correct",
            "score",
            "subject",
            "year",
            "difficulty",
        )


class CreateExamSerializer(serializers.Serializer):
    subject = serializers.ChoiceField(choices=SUBJECT_CHOICES)
    subSubjects = serializers.ListField(child=serializers.CharField())
    year = serializers.ListField(child=serializers.IntegerField())
    randomSubSubject = serializers.BooleanField()

    def create(self, validated_data):
        subject = validated_data["subject"]
        year = validated_data["year"]
        sub_subjects = validated_data["subSubjects"]

        questions_query = []
        if sub_subjects:  # If there are any subsubjects specified
            if year:
                questions_query += list(
                    Question.objects.filter(
                        subject=subject,
                        year__in=year,
                        subsubject__in=sub_subjects,
                        accepted=True,
                    )
                )
            else:
                questions_query += list(
                    Question.objects.filter(
                        subject=subject, subsubject__in=sub_subjects, accepted=True
                    )
                )
        else:  # User wants a random subsubjects exam
            if year:
                questions_query += list(
                    Question.objects.filter(
                        subject=subject, year__in=year, accepted=True
                    )
                )
            else:
                questions_query += list(
                    Question.objects.filter(subject=subject, accepted=True)
                )

        # Selects randomly a set of final questions for the exam
        if len(questions_query) < QUESTION_PER_EXAM:
            raise ValidationError(
                "Not enough questions for this exam. Please try again later."
            )
        questions = random.sample(list(questions_query), QUESTION_PER_EXAM)

        exam = Exam.objects.create()
        for question in questions:
            exam.questions.add(question)
        exam.save()
        return exam


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


class AnswersInfoSerializer(serializers.ModelSerializer):
    answer = QuestionShortSerializer()

    class Meta:
        model = AnswerInfo
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    wrong_answers = AnswersInfoSerializer(many=True)
    correct_answers = AnswersInfoSerializer(many=True)

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
        fields = (
            "user",
            "subjects",
            "xp",
            "achievements",
            "follows",
            "streak",
            "last_activity",
        )


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
    group = serializers.IntegerField(required=False, source="QuestionGroup.id")

    def create(self, validated_data):
        answers = validated_data.pop("answers")
        group = validated_data.pop("QuestionGroup", None)
        validated_data["group_id"] = group["id"] if group else None
        question = Question.objects.create(**validated_data)
        for answer in answers:
            Answer.objects.create(question=question, **answer)
        return question


class CreateQuestionGroupSerializer(serializers.ModelSerializer):
    questions = CreateQuestionSerializer(many=True)
    source = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = QuestionGroup
        fields = ("text", "source", "questions")

    def create(self, validated_data):
        # check if there are any questions in the request and create them
        questions = validated_data.pop("questions")
        group = QuestionGroup.objects.create(**validated_data)
        for question in questions:
            question["group"] = group.id
            question_serializer = CreateQuestionSerializer(data=question)
            if question_serializer.is_valid(raise_exception=True):
                question_serializer.save()

        return group


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
    password = serializers.CharField(style={"input_type": "password"})

    def validate(self, attrs):
        password = attrs.get("password")
        user = self.context.get("request").user

        if not user.check_password(password):
            err_msg = (
                "Your old password was entered incorrectly. Please enter it again."
            )
            raise serializers.ValidationError(err_msg)

        user.delete()

        return password


class ReportSerializer(serializers.ModelSerializer):

    id = serializers.SlugField(read_only=True)
    date = serializers.DateTimeField(read_only=True)
    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Report
        fields = ["id", "question", "date", "type", "body", "author"]


class CreateReportSerializer(serializers.ModelSerializer):
    body = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Report
        fields = ["question", "type", "body"]


class FillInTheBlankAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FillInTheBlankAnswer
        fields = ("id", "text", "correct", "dropdown_number")


class CreateFillInTheBlankQuestionSerializer(serializers.Serializer):
    text = serializers.CharField()
    resolution = serializers.CharField(required=False, allow_blank=True)
    subsubject = serializers.CharField()
    subject = serializers.CharField()
    year = serializers.IntegerField()
    source = serializers.CharField(required=False, allow_blank=True)
    fillintheblank_answers = serializers.ListField(
        child=FillInTheBlankAnswerSerializer()
    )
    total_dropdowns = serializers.IntegerField(default=2)


class FillInTheBlankQuestionSerializer(serializers.ModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)
    answers = FillInTheBlankAnswerSerializer(many=True)
    image = serializers.SerializerMethodField()
    resources = ResourceSerializer(many=True)

    class Meta:
        model = FillInTheBlankQuestion
        fields = (
            "id",
            "text",
            "resolution",
            "subject",
            "subsubject",
            "year",
            "difficulty",
            "comment",
            "answers",
            "image",
            "source",
            "date",
            "resources",
            "total_dropdowns",
        )

    def validate(self, attrs):
        if len(attrs["answers"]) != attrs["total_dropdowns"]:
            raise serializers.ValidationError(
                {
                    "total_dropdowns": "Number of answers must be equal to total_dropdowns"
                }
            )

        return attrs
