from django.urls import path
from .views import *

urlpatterns = [
	path("questions", QuestionsListView.as_view()),
	path("question/<int:id>", QuestionView.as_view()),
	path("question/", QuestionView.as_view()),
	path("comment/", CommentView.as_view()),
	path("comment/<int:id>", CommentView.as_view()),
	path("current_user", CurrentUserView.as_view()),
	path("upvote_comment/<int:id>", UpvoteCommentView.as_view()),
	path("downvote_comment/<int:id>", DownvoteCommentView.as_view()),
	path("remove_downvote/<int:id>", RemoveDownvoteCommentView.as_view()),
	path("remove_upvote/<int:id>", RemoveUpvoteCommentView.as_view()),
	path("has_upvoted/<int:id>", HasUserUpvoted.as_view()),
	path("has_downvoted/<int:id>", HasUserDownvoted.as_view()),
	path("exam/", ExamView.as_view()),
	path("exam/<int:id>", ExamView.as_view()),
	path("achievements", AchievementsListView.as_view()),
	path("profile/<int:id>", ProfileView.as_view()),
	path("add_image/<int:id>", AddImageToQuestion.as_view()),
	path("submitted_questions", SubmittedQuestions.as_view()),
	path("xpevents/<int:id>", XPEventsAPI.as_view()),
	path("subject/<str:subject>", SubjectAPI.as_view()),
	path("leaderboard/", Leaderboard.as_view()),
	path("leaderboard/<str:time>", Leaderboard.as_view()),
	path("follow/<int:id>", Follow.as_view())
]
