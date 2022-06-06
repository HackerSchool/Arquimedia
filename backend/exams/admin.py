from django.contrib import admin
from .models import Exam, Question, Answer, Report

# Register your models here.
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Report)