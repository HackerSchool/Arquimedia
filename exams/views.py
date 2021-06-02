
from django.shortcuts import render, redirect
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Exam, Question, Answer
from django.views.decorators.csrf import csrf_exempt
from random import shuffle
from django.contrib.auth.decorators import login_required
import random
from users.models import Profile, SubjectInfo

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
        "exam": exame,
        "corretas": exame.correct.count(),
        "erradas": exame.failed.count()
    }

    exame.delete()

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
    Random=False
    Imaginários=False
    Geometria=False
    Freshman=False
    Junior=False
    Senior=False


    numberChoices = 0
    


    if (request.method == "POST"):
        for keys, values in request.POST.items():
            if keys in ["csrfmiddlewaretoken"]:
                continue


            if (values=="Random"):
                 questionsRand = Question.objects.filter(subject=MATH).all()###Ciclo Exame Random #####Else if'?
                 numberChoices +=1
                 Random=True
                
            if (values=="Imaginários"): 
                questionsImag = Question.objects.filter(subsubject=IMAGINARY).all()###Ciclo Exame de Imaginários
                numberChoices +=1
                Imaginários=True


            if (values=="Geometria"): 
                questionsGeom = Question.objects.filter(subsubject=GEOMETRY).all()###Ciclo Exame de geometria
                numberChoices +=1
                Geometria=True


            if (values=="10º"): 
                questions = Question.objects.filter(year=10).all()###Ciclo Exame de 10ºAno
                numberChoices +=1
                Freshman=True

            if (values=="11º"): 
                questions = Question.objects.filter(year=11).all()###Ciclo Exame de 11ºAno
                numberChoices +=1
                Junior=True


            if (values=="12º"):
                 questions = Question.objects.filter(year=12).all()###Ciclo Exame de 12ºAno
                 numberChoices +=1
                 Senior=True
            
            questionsExam = []
            numberOfQuestions=1
            for i in range(numberOfQuestions//numberChoices):
                                                                              ###  Temos várias listas com perguntas de tópicos diferentes, 
                                                                              ### para que se consiga controlar o nº de perguntas que aparecem
                                                                              ### por resposta de forma a que tenhamos um teste populado de forma equitativa 
                if(Senior or Junior or Freshman): ### may be replaced by the lenght of a queryset 
                    choice = questions[random.randint(0, len(questions) - 1)] 
                    while choice in questionsExam:
                        
                        choice = questions[random.randint(0, len(questions) - 1)]

                    questionsExam.append(choice)
                if(Random):
                    choice = questionsRand[random.randint(0, len(questionsRand) - 1)]      
                    
                    while choice in questionsExam:
                        
                        choice = questionsRand[random.randint(0, len(questionsRand) - 1)]

                    questionsExam.append(choice)
                if(Imaginários):
                    choice = questionsImag[random.randint(0, len(questionsImag) - 1)]
                    
                    while choice in questionsExam:
                        
                        choice = questionsImag[random.randint(0, len(questionsImag) - 1)]

                    questionsExam.append(choice)
                if(Geometria):
                    choice = questionsGeom[random.randint(0, len(questionsGeom) - 1)]
                    
                    while choice in questionsExam:
                        
                        choice = questionsGeom[random.randint(0, len(questionsGeom) - 1)]

                    questionsExam.append(choice)

            exame = Exam.objects.create()

            for question in questionsExam:
                exame.questions.add(question)

            return redirect("http://localhost:8000/exame/{}/render".format(exame.id))
        
    context = {}

    return render(request, "generate.html", context)

