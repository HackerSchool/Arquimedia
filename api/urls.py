from django.urls import path
from .views import *

urlpatterns = [
	path("questions", QuestionsListView.as_view()),
	path("question/<int:id>", QuestionView.as_view()),
	path("comment/<int:id", CommentView.as_view()),
	path("create_comment", CreateCommentView.as_view()),
	path("current_user", CurrentUserView.as_view()),
	path("delete_comment/<int:pk>", DeleteCommentView.as_view()),
	path("upvote_comment/<int:id>", UpvoteCommentView.as_view()),
	path("downvote_comment/<int:id>", DownvoteCommentView.as_view()),
	path("remove_downvote/<int:id>", RemoveDownvoteCommentView.as_view()),
	path("remove_upvote/<int:id>", RemoveUpvoteCommentView.as_view()),
]
