from django.urls import path
from .views import *

urlpatterns = [
	path("questions", QuestionsListView.as_view()),
	path("question/<int:id>", QuestionView.as_view()),
	path("question/resource/<int:id>", ResourceView.as_view()),
	path("question/", QuestionView.as_view()),
	path("comment/", CommentView.as_view()),
	path("comment/<int:id>", CommentView.as_view()),
	path("current_user", CurrentUserView.as_view()),
	path("upvote/<int:id>", UpvoteCommentView.as_view()),
	path("downvote/<int:id>", DownvoteCommentView.as_view()),
	path("has_upvoted/<int:id>", HasUserUpvoted.as_view()),
	path("has_downvoted/<int:id>", HasUserDownvoted.as_view()),
	path("exam/", ExamView.as_view()),
	path("exam/<int:id>", ExamView.as_view()),
	path("exam/recommended/", RecommendedExamView.as_view()),
	path("achievements", AchievementsListView.as_view()),
	path("profile/<int:id>", ProfileView.as_view()),
	path("add_image/<int:id>", AddImageToQuestion.as_view()),
	path("submitted_questions", SubmittedQuestions.as_view()),
	path("xpevents/<int:id>", XPEventsAPI.as_view()),
	path("subject/<str:subject>", SubjectAPI.as_view()),
	path("leaderboard/", Leaderboard.as_view()),
	path("leaderboard/<str:time>/<int:page>", Leaderboard.as_view()),
	path("follow/<int:id>", Follow.as_view()),
	path("email-confirm/<str:username>/<int:code>", VerifyEmailView.as_view()),
	path("users/", Users.as_view()),
	path("user/", DeleteAccount.as_view()),
	path("reports/", ReportListView.as_view()),
	path("report/", ReportView.as_view()),
	path("report/<int:id>", ReportView.as_view())
]
