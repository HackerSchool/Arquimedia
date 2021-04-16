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

    if (request.method == "POST"):
        exame = Exam.objects.get(pk=id)

        questions =  exame.questions.all()

        i = 0
        
        for question, answer in request.POST.items():
            if question == "id_exame":
                continue

            elif questions[i].correctAnswer.text == answer:
                exame.correct.add(questions[i])

                # score increment not working
                exame.score += 20
            else:
                exame.failed.add(questions[i])
            
            i += 1

    context = {
        "exam": exame
    }

    return render(request, "results.html", context)

        