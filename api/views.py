from django.db.models import query
from django.shortcuts import render
from rest_framework.views import APIView
from exams.models import Question, Comment
from rest_framework import generics, serializers, status
from .serializer import *
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
			return Response({"Bad Request": "User not logged in..."}, status=status.HTTP_400_BAD_REQUEST)

		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			content = serializer.data.get("content")
			question = Question.objects.get(id=serializer.data.get("question")["id"])
			comment = Comment(author=self.request.user, question=question, content=content)
			comment.save()

			return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
		
		return Response({"Bad Request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)


class DeleteCommentView(APIView):
	serializer_class = CommentDeleteSerializer

	def delete(self, request, *args, **kwargs):
		serializer = self.serializer_class(data=request.data)
		comment = Comment.objects.get(id=kwargs.get("pk"))
		if self.request.user == comment.author:
			comment.delete()

			return Response({"Comment deleted!"}, status=status.HTTP_200_OK)

		return Response({"Can't delete other user's comments"}, status=status.HTTP_401_UNAUTHORIZED)




class CurrentUserView(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)