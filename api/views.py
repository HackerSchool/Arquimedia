from django.db.models import query
from django.shortcuts import render
from rest_framework.views import APIView
from exams.models import Question, Comment
from rest_framework import generics, serializers, status
from .serializer import QuestionSerializer, CommentSerializer
from rest_framework.response import Response

# Create your views here.

class QuestionsListView(generics.ListAPIView):
	queryset = Question.objects.all()
	serializer_class = QuestionSerializer


class QuestionView(generics.RetrieveAPIView):
	serializer_class = QuestionSerializer
	lookup_field = "id"
	queryset = Question.objects.all()


class CommentView(generics.RetrieveAPIView):
	serializer_class = CommentSerializer
	lookup_field = "id"
	queryset = Comment.objects.all()


class CreateCommentView(APIView):
	serializer_class = CommentSerializer

	def post(self, request, format=None):
		if not self.request.user.is_authenticated:
			print(self.request.user.username)
			return Response({"Bad Request": "User not logged in..."}, status=status.HTTP_400_BAD_REQUEST)

		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			content = serializer.data.get("content")
			question = Question.objects.get(id=int(serializer.data.get("question")["id"]))
			comment = Comment(author=self.request.user, question=question, content=content)
			comment.save()

			return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
		
		return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)