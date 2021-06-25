from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, response
from .models import Exam, Question, Answer, Comment
from django.views.decorators.csrf import csrf_exempt
from random import shuffle
from django.contrib.auth.decorators import login_required
import random
from users.models import Profile, SubjectInfo
from .forms import *
import json

MATH = "Matemática"
GEOMETRY = "Geometria"
IMAGINARY = "Imaginários"


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
        "exam": exame
    }
    
    print(exame.failed.all())
    for i in exame.failed.all(): print(i.text)

    return render(request, "results.html", context)


@login_required
def exam_id_render(request, id):
    userProfile = request.user.profile
    exam = Exam.objects.get(id=id)

    if (request.method == "GET"):
        
        questionsquery = exam.questions.all()

        for i in questionsquery:
            print(i.answer.all()) 

        context = {
            'exam_list': exam,
            'question_list': questionsquery
        }

    if (request.method == "POST"):

        profileSubject = userProfile.subjects.filter(subject=MATH)[0]
        questions = exam.questions.all()
        profileSubject.examCounter += 1

        i = 0
        for question, answer in request.POST.items():
            if question in ["csrfmiddlewaretoken", "ExamAnswered"]:
                continue

            questionObject = Question.objects.get(id=int(question))
            correctAnswer = Answer.objects.get(question=questionObject, correct=True)
            
            if correctAnswer.id == int(answer):
                profileSubject.addCorrectAnswer(questionObject)
                exam.correct.add(questionObject)

                exam.score += 20
            else:
                profileSubject.addWrongAnswer(questionObject)
                exam.failed.add(questionObject)

            i += 1

        exam.save()
        profileSubject.save()
        
        return redirect("http://localhost:8000/exame/results/{}".format(exam.id))

    return render(request,"render.html", context)


@login_required
def generate_exam(request):
    if (request.method == "POST"):
        for keys, values in request.POST.items():
            
            if keys in ["csrfmiddlewaretoken"]:
                continue


            if (values=="Random"): questions = Question.objects.filter(subject=MATH).all()###Ciclo Exame Random #####Else if'?
                
            if (values=="Imaginários"): questions = Question.objects.filter(subsubject=IMAGINARY).all()###Ciclo Exame de Imaginários

            if (values=="Geometria"): questions = Question.objects.filter(subsubject=GEOMETRY).all()###Ciclo Exame de geometria

            if (values=="10º"): questions = Question.objects.filter(year=10).all()###Ciclo Exame de 10ºAno

            if (values=="11º"): questions = Question.objects.filter(year=11).all()###Ciclo Exame de 11ºAno

            if (values=="12º"): questions = Question.objects.filter(year=12).all()###Ciclo Exame de 12ºAno

            questionsExam = []

            for i in range(10):
                choice = questions[random.randint(0, len(questions) - 1)]
                while choice in questionsExam:
                    
                    choice = questions[random.randint(0, len(questions) - 1)]

                questionsExam.append(choice)

            exame = Exam.objects.create()

            for question in questionsExam:
                exame.questions.add(question)

            return redirect("http://localhost:8000/exame/{}/render".format(exame.id))
        
    context = {}

    return render(request, "generate.html", context)


@login_required
def questionPage(request, id):
    question = Question.objects.get(id=id)
    wrongAnswers = question.wrongAnswers()

    if request.method == "POST":
        form = CommentForm(request.POST)

        if form.is_valid():
            comment = form.save(commit=False)
            comment.question = question
            comment.author = request.user
            comment.save()

    commentForm = CommentForm()

    context = {
        "question": question,
        "wrongAnswers": wrongAnswers,
        "commentForm": commentForm
    }

    return render(request, "question.html", context)


def deleteComment(request, id):
    if (request.method != "POST"): return JsonResponse({"success":False}, status=400)

    comment = Comment.objects.get(id=id)
    if request.user != comment.author:
        return JsonResponse({"success":False}, status=400)

    comment.delete()

    return JsonResponse({"success":True}, status=200)


def addComment(request):
    if (request.method != "POST"): return JsonResponse({"success":False}, status=400)
    body = json.loads(request.body)
    content = body["text"]
    question = Question.objects.get(id=body["question"])

    comment = Comment.objects.create(
        author=request.user,
        question=question,
        content=content
        )
    comment.save()

    response = {
        "success":True,
        "user": request.user.username,
        "date": comment.date,
        "commentId": comment.id
    }

    return JsonResponse(response, status=200)


def upvoteComment(request, id):
    if (request.method != "GET"): return JsonResponse({"success":False}, status=400)

    comment = Comment.objects.get(id=id)

    if (comment.upvote(request.user) == 0):
        return JsonResponse({"success":False}, status=400)

    return JsonResponse({"success":True}, status=200)


def downvoteComment(request, id):
    if (request.method != "GET"): return JsonResponse({"success":False}, status=400)

    comment = Comment.objects.get(id=id)

    if (comment.downvote(request.user) == 0):
        return JsonResponse({"success":False}, status=400)

    return JsonResponse({"success":True}, status=200)

