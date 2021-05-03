from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Exam, Question
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import random
from users.models import Profile, SubjectInfo

MATH = "Matemática"


def list_exams(request):
    if (request.method == "GET"):
        Id = request.GET.get("id")
        if Id:
            exam = list(Exam.objects.filter(pk=Id).values())
            return JsonResponse(exam, safe=False)

        exams = list(Exam.objects.values())

        return JsonResponse(exams, safe=False)


def results(request, id):
    print(request.user)
    exame = Exam.objects.get(pk=id)
    
    context = {
        "exam": exame,
        "corretas": exame.failed.count(),
        "erradas": exame.correct.count()
    }

    exame.delete()

    return render(request, "results.html", context)


@login_required
def exam_id_render(request, id):
    userProfile = request.user.profile
    exam = Exam.objects.get(id=id)

    if (request.method == "GET"):
        
        questionsquery = exam.questions.all()

        context = {
            'exam_list': exam,
            'question_list': questionsquery
        }

    if (request.method == "POST"):

        profileSubject = userProfile.subjects.filter(subject=MATH)[0]
        questions =  exam.questions.all()
        profileSubject.examCounter += 1

        i = 0
        for question, answer in request.POST.items():
            if question in ["csrfmiddlewaretoken", "ExamAnswered"]:
                continue

            if questions[i].correctAnswer.id == int(answer):
                #profileSubject.correctAnswers.add(questions[i])
                exam.correct.add(questions[i])

                exam.score += 20
            else:
                #profileSubject.wrongAnswers.add(questions[i])
                exam.failed.add(questions[i])

            i += 1

        exam.save()
        profileSubject.save()
        
        return redirect("http://localhost:8000/exame/results/{}".format(exam.id))

    return render(request,"render.html", context)


@login_required
def generate_exam(request):
    print(request.user)
    if (request.method == "POST"):

        questions = Question.objects.filter(subject=MATH).all()
        questionsExam = []

        print(questions)

        for i in range(9):
            choice = questions[random.randint(0, len(questions) - 1)]
            while choice in questionsExam:
                choice = questions[random.randint(0, len(questions) - 1)]

            questionsExam.append(choice)
            print(questionsExam[i])

        
        exame = Exam.objects.create()

        for question in questionsExam:
            exame.questions.add(question)

        return redirect("http://localhost:8000/exame/{}/render".format(exame.id))
        

    context = {}

    return render(request, "generate.html", context)

