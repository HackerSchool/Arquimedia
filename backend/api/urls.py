from django.urls import path
from .views import *

urlpatterns = [
	path("questions", QuestionsListView.as_view()),
	path("question/<int:id>", QuestionView.as_view()),
	path("comment/<int:id>", CommentView.as_view()),
	path("create_comment", CreateCommentView.as_view()),
	path("current_user", CurrentUserView.as_view()),
	path("delete_comment/<int:pk>", DeleteCommentView.as_view()),
	path("upvote_comment/<int:id>", UpvoteCommentView.as_view()),
	path("downvote_comment/<int:id>", DownvoteCommentView.as_view()),
	path("remove_downvote/<int:id>", RemoveDownvoteCommentView.as_view()),
	path("remove_upvote/<int:id>", RemoveUpvoteCommentView.as_view()),
	path("has_upvoted/<int:id>", HasUserUpvoted.as_view()),
	path("has_downvoted/<int:id>", HasUserDownvoted.as_view()),
	path("exam/<int:id>", ExamView.as_view()),
	path("create_exam", CreateExamView.as_view()),
	path("submit_exam/<int:id>", ExamSubmission.as_view()),
	path("achievements", AchievementsListView.as_view()),
	path("profile/<int:id>", ProfileView.as_view()),
	path("create_question", CreateQuestionSubmission.as_view()),
	path("add_image/<int:id>", AddImageToQuestion.as_view()),
	path("submitted_questions", SubmittedQuestions.as_view()),
	path("delete_question/<int:id>", DeleteQuestion.as_view()),
	path("accept_question/<int:id>", AcceptQuestion.as_view())
]
