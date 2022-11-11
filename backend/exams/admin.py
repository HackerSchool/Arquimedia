from django.contrib import admin
from .models import Exam, Question, FillInTheBlankQuestion, Answer, Report

# Register your models here.
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(FillInTheBlankQuestion)
admin.site.register(Answer)
admin.site.register(Report)