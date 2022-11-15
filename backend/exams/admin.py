from django.contrib import admin
from .models import Exam, Question,  Answer, FillInTheBlankQuestion, FillInTheBlankAnswer, QuestionGroup, Report, Resource

# Register your models here.
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(FillInTheBlankQuestion)
admin.site.register(FillInTheBlankAnswer)   
admin.site.register(Answer)
admin.site.register(Report)
admin.site.register(Resource)
admin.site.register(QuestionGroup)
