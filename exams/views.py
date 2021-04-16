from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Exam, Question


def list_exams(request):
    if (request.method == "GET"):
        Id = request.GET.get("id")
        if Id:
            exam = list(Exam.objects.filter(pk=Id).values())
            return JsonResponse(exam, safe=False)

        exams = list(Exam.objects.values())

        return JsonResponse(exams, safe=False)


def exam_id_render(request, id):
    if (request.method == "GET"):
        examquery = Exam.objects.get(id=id)
        questionsquery = examquery.questions.all()

        context = {
            'exam_list': examquery,
            'question_list': questionsquery
        }

    return render(request,"exams/render.html", context)

        