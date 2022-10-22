from django.contrib import admin
from .models import Exam, Question, Answer, Report, QuestionGroup

# Register your models here.
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Report)
admin.site.register(QuestionGroup)