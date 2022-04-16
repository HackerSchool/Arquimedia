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
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
import datetime
from rest_auth.registration.serializers import VerifyEmailSerializer
from allauth.account.models import EmailAddress

XP_PER_EXAM = 100
XP_PER_CORRECT_ANSWER = 10
LEADERBOARD_PAGE_SIZE = 10

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

			if question.data.get("source"):
				newQuestion.source = question.data.get("source")

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

	# Upvotes a Comment
	def post(self, request, id):
		comment = Comment.objects.get(id=id)
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

	# Removes an upvote from a Comment
	def delete(self, request, id):
		comment = Comment.objects.get(id=id)
		if request.user not in comment.upvoters.all():
			return Response({"User hasn't upvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		comment.votes -= 1
		
		comment.upvoters.remove(request.user)
		comment.save()

		return Response(self.serializer_class(comment).data, status=status.HTTP_200_OK)



class DownvoteCommentView(APIView):
	permission_classes = [IsAuthenticated]
	serializer_class = CommentSerializer

	# Downvotes a Comment
	def post(self, request, id):
		comment = Comment.objects.get(id=id)
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

	# Removes a downvote from a Comment
	def delete(self, request, id):
		comment = Comment.objects.get(id=id)
		if request.user not in comment.downvoters.all():
			return Response({"User hasn't downvoted this comment"}, status=status.HTTP_400_BAD_REQUEST)

		comment.votes += 1
		
		comment.downvoters.remove(request.user)
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

			questionsQuery = []

			if (subSubjects): # If there are any subsubjects specified
				for subSubject in subSubjects:
					if year:
						temp = list(Question.objects.filter(year=year, subsubject=subSubject))
						for i in temp: questionsQuery.append(i)
					else:
						temp = list(Question.objects.filter(subsubject=subSubject))
						for i in temp: questionsQuery.append(i)
			else: # User wants a random subsubjects exam
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
		


class XPEventsAPI(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, id):
		user = get_object_or_404(User, id=id)
		events = XPEvent.objects.filter(user=user)
		serializer = XPEventSerializer(events, many=True)
		return Response(serializer.data)


class SubjectAPI(APIView):
	permission_classes = [IsAuthenticated]

	class Subject:
		def __init__(self, subject, questions):
			self.subject = subject
			self.questions = questions
				
	def get(self, request, subject):
		questions = get_list_or_404(Question, subject=subject)
		sub = self.Subject(subject=subject, questions=questions)

		return Response(SubjectInfoSerializer(sub).data)


class Leaderboard(APIView):
	class XPProfile:
		def __init__(self, id, xp):
			self.id = id
			self.xp = xp

	def get(self, request, time, page):
		def checkForUser(list, userID):
			for i in list:
				if i.id == userID: return True

			return False

		def getXPProfile(list, userID):
			for i in list:
				if i.id == userID: return i

		start_position = (page - 1) * LEADERBOARD_PAGE_SIZE
		end_position = page * LEADERBOARD_PAGE_SIZE

		if time == "alltime":
			users = Profile.objects.order_by("-xp__xp")

			# Creates an XPProfile object for each user 
			formated_users = [self.XPProfile(i.id, i.xp.xp) for i in users[start_position:end_position]]

			return Response(ProfileLeaderboardTimedSerializer(formated_users, many=True).data)

		elif time == "month":
			date = datetime.date.today() - datetime.timedelta(days=30)
		elif time == "day":
			date = datetime.date.today() - datetime.timedelta(days=1)
		else:
			return Response({"Bad Request": "Invalid date"}, status=status.HTTP_400_BAD_REQUEST)

		events = XPEvent.objects.filter(date__gte=date)

		users = []
		for n, i in enumerate(events):
			repeated = False
			for e in events[:n]:
				if i.user == e.user:
					repeated = True

			if not repeated: users.append(i.user)


		usersXP = []
		for user in users[start_position:end_position + 1]:
			for event in events:
				if user == event.user:
					if not checkForUser(usersXP, user.id): 
						usersXP.append(self.XPProfile(user.id, event.amount))
					else:
						getXPProfile(usersXP, user.id).xp += event.amount

		usersXP.sort(key=lambda x: x.xp, reverse=True)

		return Response(ProfileLeaderboardTimedSerializer(usersXP, many=True).data)


class Follow(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, id):
		user_profile = request.user.profile

		user_to_follow = User.objects.get(id=id)

		if request.user == user_to_follow:
			return Response(status=status.HTTP_400_BAD_REQUEST)

		user_profile.addToFollowing(user_to_follow)

		return Response(status=status.HTTP_200_OK)
	

	def delete(self, request, id):
		user_profile = request.user.profile

		user_to_remove_follow = User.objects.get(id=id)

		if user_to_remove_follow not in user_profile.follows.all():
			return Response(status=status.HTTP_400_BAD_REQUEST)

		user_profile.removeFromFollowing(user_to_remove_follow)

		return Response(status=status.HTTP_200_OK)

class VerifyEmailView(APIView):
	permission_classes = (AllowAny,)
	allowed_methods = ('GET', 'OPTIONS', 'HEAD')

	def get(self, request, code, username):
		user = User.objects.get(username=username)

		if (user.profile.email_confirmation_code == code):
			email = EmailAddress.objects.get(user=user)
			email.verified = True
			email.save()

			return Response({'detail': 'ok'}, status=status.HTTP_200_OK)
		
		return Response({'detail': 'wrong code'}, status=status.HTTP_400_BAD_REQUEST)
