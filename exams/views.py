from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Exam, Question
from django.views.decorators.csrf import csrf_exempt

def list_exams(request):
    if (request.method == "GET"):
        Id = request.GET.get("id")
        if Id:
            exam = list(Exam.objects.filter(pk=Id).values())
            return JsonResponse(exam, safe=False)

        exams = list(Exam.objects.values())

        return JsonResponse(exams, safe=False)


@csrf_exempt
def results(request, id):
    exame = Exam.objects.get(pk=id)
    
    if (request.method == "POST"):
        

        questions =  exame.questions.all()

        i = 0

        for question, answer in request.POST.items():
            if question in ["csrfmiddlewaretoken", "ExamAnswered"]:
                continue

            if questions[i].correctAnswer.id == int(answer):
                exame.correct.add(questions[i])

                exame.score += 20
            else:
                exame.failed.add(questions[i])

            i += 1
           

    context = {
        "exam": exame,
        "corretas": exame.correct.count(),
        "erradas": exame.failed.count()
    }

    return render(request, "results.html", context)

  
def exam_id_render(request, id):
    if (request.method == "GET"):
        examquery = Exam.objects.get(id=id)
        questionsquery = examquery.questions.all()

        context = {
            'exam_list': examquery,
            'question_list': questionsquery
        }

    return render(request,"render.html", context)

        