from random import random
import re
from django.db.models import query
from django.shortcuts import render
from rest_framework.views import APIView
from exams.models import Question, Comment, Exam
from rest_framework import generics, serializers, status
from .serializer import *
from rest_framework.response import Response
import random
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated 

XP_PER_EXAM = 100
XP_PER_CORRECT_ANSWER = 10
# Create your views here.

class QuestionsListView(generics.ListAPIView):
	permission_classes = [IsAuthenticated]

	queryset = Question.objects.all()
	serializer_class = QuestionSerializer


class QuestionView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, id):
		question = get_object_or_404(Question, id=id)

		return Response(QuestionSerializer(question).data, status=status.HTTP_200_OK)


	# Validates a question
	def put(self, request, id):
		if not(request.user.is_superuser):
			return Response(status=status.HTTP_403_FORBIDDEN)

		question = get_object_or_404(Question, id=id)
		question.accepted = True
		question.save()

		return Response(status=status.HTTP_200_OK)

	
	def delete(self, request, id):
		question = get_object_or_404(Question, id=id)

		if (request.user != question.author) and not (request.user.is_superuser):
			return Response(status=status.HTTP_403_FORBIDDEN)

		question.delete()

		return Response(status=status.HTTP_200_OK)


	# Creates new question request, which will have to be validated
	def post(self, request):
		question = CreateQuestionSerializer(data=request.data)
		if question.is_valid(): 
			newQuestion = Question.objects.create()
		
			for answer in question.data.get("answers"):
				newAnswer = Answer.objects.create(text=answer["text"], correct=answer["correct"], question=newQuestion)
				newAnswer.save()

			newQuestion.text = question.data.get("text")
			newQuestion.subject = question.data.get("subject")
			newQuestion.subsubject = question.data.get("subsubject")
			newQuestion.year = question.data.get("year")
			newQuestion.author = request.user

			newQuestion.save()

			return Response(QuestionSerializer(newQuestion).data, status=status.HTTP_201_CREATED)
		else:
			return Response({"Bad Request": "Bad data"}, status=status.HTTP_400_BAD_REQUEST)


class AddImageToQuestion(APIView):
	parser_classes = [MultiPartParser]
	permission_classes = [IsAuthenticated]

	def post(self, request, *args, **kwargs):
		question = Question.objects.get(id=kwargs.get("id"))

		if not self.request.user.is_authenticated:
			return Response({"Bad Request": "User not logged in..."}, status=status.HTTP_400_BAD_REQUEST)

		if question.author != self.request.user:
			return Response(status=status.HTTP_403_FORBIDDEN)

		image = request.data["file"]

		question.image = image
		question.save()

		return Response(status=status.HTTP_202_ACCEPTED)


class SubmittedQuestions(generics.ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Question.objects.filter(accepted=False)
	serializer_class = QuestionSerializer


class CommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	def get(self, request, id):
		if not self.request.user.is_authenticated:
			return Response({"Bad Request": "User not logged in..."}, status=status.HTTP_400_BAD_REQUEST)
			
		comment = get_object_or_404(Comment, id=id)

		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)

	def post(self, request):
		if not self.request.user.is_authenticated:
			return Response({"Bad Request": "User not logged in..."}, status=status.HTTP_400_BAD_REQUEST)

		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			content = serializer.data.get("content")
			question = Question.objects.get(id=serializer.data.get("question")["id"])
			comment = Comment(author=self.request.user, question=question, content=content)
			comment.save()

			return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
		
		return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, id):
		comment = get_object_or_404(Comment, id=id)
		if self.request.user == comment.author:
			comment.delete()

			return Response({"Comment deleted!"}, status=status.HTTP_200_OK)

		return Response({"Can't delete other user's comments"}, status=status.HTTP_401_UNAUTHORIZED)


class UpvoteCommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	def post(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user in comment.upvoters.all():
			return Response({"User already upvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		if request.user in comment.downvoters.all():
			comment.votes += 2
			comment.downvoters.remove(request.user)
		else:
			comment.votes += 1
		
		comment.upvoters.add(request.user)
		comment.save()

	
		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)


class DownvoteCommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	def post(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user in comment.downvoters.all():
			return Response({"User already downvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		if request.user in comment.upvoters.all():
			comment.votes -= 2
			comment.upvoters.remove(request.user)
		else:
			comment.votes -= 1
		
		comment.downvoters.add(request.user)
		comment.save()

		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)


class RemoveDownvoteCommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	def post(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user not in comment.downvoters.all():
			return Response({"User hasn't downvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		comment.votes += 1
		
		comment.downvoters.remove(request.user)
		comment.save()

		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)


class RemoveUpvoteCommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	def post(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user not in comment.upvoters.all():
			return Response({"User hasn't upvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		comment.votes -= 1
		
		comment.upvoters.remove(request.user)
		comment.save()

		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)


class HasUserUpvoted(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user in comment.upvoters.all():
			return Response(status=status.HTTP_200_OK)
		
		else: return Response(status=status.HTTP_400_BAD_REQUEST)


class HasUserDownvoted(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, *args, **kwargs):
		comment = Comment.objects.get(id=kwargs.get("id"))
		if request.user in comment.downvoters.all():
			return Response(status=status.HTTP_200_OK)
		
		else: return Response(status=status.HTTP_400_BAD_REQUEST)


class ExamView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, id):
		exam = get_object_or_404(Exam, id=id)

		return Response(ExamSerializer(exam).data, status=status.HTTP_200_OK)


	def post(self, request):

		serializer = CreateExamSerializer(data=request.data)
		if serializer.is_valid():
			subject = serializer.data.get("subject")
			year = serializer.data.get("year")
			subSubjects = serializer.data.get("subSubjects")
			randomSubSubject = serializer.data.get("randomSubSubject")

			questionsQuery = []

			if (not randomSubSubject):
				for subSubject in subSubjects:
					if subSubject != "none":
						if year:
							temp = list(Question.objects.filter(year=year, subsubject=subSubject))
							for i in temp: questionsQuery.append(i)
						else:
							temp = list(Question.objects.filter(subsubject=subSubject))
							for i in temp: questionsQuery.append(i)
			else:
				if year:
					temp = list(Question.objects.filter(year=year))
					for i in temp: questionsQuery.append(i)
				else:
					temp = list(Question.objects.all())
					for i in temp: questionsQuery.append(i)


			questions = []
			nrOfQuestions = 10

			# Selects randomly a set of final questions for the exam
			questions = random.sample(list(questionsQuery), nrOfQuestions)
			
			exam = Exam.objects.create()

			for question in questions: exam.questions.add(question)

			exam.save()

			return Response(ExamSerializer(exam).data, status=status.HTTP_201_CREATED)


		return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)


	def put(self, request, id):
		exam = get_object_or_404(Exam, id=id)

		if exam.correct.count() or exam.failed.count():
			return Response({"Bad Request": "Exam already submitted"}, status=status.HTTP_400_BAD_REQUEST)

		profileSubject = request.user.profile.subjects.get(subject="Matemática")
		for question, answer in request.data.items():

			questionQuery = Question.objects.get(id=int(question))
			if int(answer) != 0:
				answerQuery = Answer.objects.get(id=int(answer))

				if answerQuery.correct:
					profileSubject.addCorrectAnswer(questionQuery)
					exam.correct.add(questionQuery)

					request.user.profile.xp.xp += XP_PER_CORRECT_ANSWER
					exam.score += 20

				else: 
					profileSubject.addWrongAnswer(questionQuery)
					exam.failed.add(questionQuery)

			else:
				profileSubject.addWrongAnswer(questionQuery)
				exam.failed.add(questionQuery)

		request.user.profile.xp.xp += XP_PER_EXAM
		request.user.profile.xp.save()
		exam.save()
		profileSubject.save()

		serializer = ExamSerializer(exam)

		return 	Response(serializer.data, status=status.HTTP_200_OK)


class AchievementsListView(generics.ListAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Achievement.objects.all()
	serializer_class = AchievementSerializer


class ProfileView(generics.RetrieveAPIView):
	permission_classes = [IsAuthenticated]
	serializer_class = ProfileSerializer
	lookup_field = "id"
	queryset = Profile.objects.all()


class CurrentUserView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response(serializer.data)
        

