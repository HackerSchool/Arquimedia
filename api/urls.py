from django.urls import path
from .views import *

urlpatterns = [
	path("questions", QuestionsListView.as_view()),
	path("question/<int:id>", QuestionView.as_view()),
	path("comment/<int:id", CommentView.as_view()),
	path("create_comment", CreateCommentView.as_view()),
	path("current_user", CurrentUserView.as_view()),
	path("delete_comment/<int:pk>", DeleteCommentView.as_view())
]
