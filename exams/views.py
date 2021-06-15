
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

    subjectAndYearList = [[],[]]

    if (request.method == "POST"):
        


        for keys, values in request.POST.items():
            if keys in ["csrfmiddlewaretoken"]:
                continue
            
            if (values=="10º"): 
                questions = Question.objects.filter(year=10).all()###Ciclo Exame de 10ºAno
                subjectAndYearList[1].append(10)
 

            if (values=="11º"): 
                questions = Question.objects.filter(year=11).all()###Ciclo Exame de 11ºAno
                subjectAndYearList[1].append(11)



            if (values=="12º"):
                 questions = Question.objects.filter(year=12).all()###Ciclo Exame de 12ºAno
                 subjectAndYearList[1].append(12)

        if(request.POST.getlist('MultipleChoice')):
            for subject in request.POST.getlist('MultipleChoice'):
                if (subject=="Random" and len(subjectAndYearList[1])!=0):
                    questionsRand = Question.objects.filter(subject=MATH).filter(year = subjectAndYearList[1][0]).all()###Ciclo Exame Random 
                    subjectAndYearList[0].append(questionsRand)

                elif (subject=="Random"):
                    questionsRand = Question.objects.filter(subject=MATH).all()###Ciclo Exame Random 
                    subjectAndYearList[0].append(questionsRand)


                elif(subject=="Imaginários" and len(subjectAndYearList[1])!=0 ): 
                    questionsImag = Question.objects.filter(subsubject=IMAGINARY).filter(year = subjectAndYearList[1][0]).all()###Ciclo Exame de Imaginários
                    subjectAndYearList[0].append(questionsImag)

                elif(subject=="Imaginários"):
                    questionsImag = Question.objects.filter(subsubject=IMAGINARY).all()###Ciclo Exame de Imaginários
                    subjectAndYearList[0].append(questionsImag)


                elif(subject=="Geometria" and len(subjectAndYearList[1])!=0): 
                    questionsGeom = Question.objects.filter(subsubject=GEOMETRY).filter(year = subjectAndYearList[1][0]).all()###Ciclo Exame de geometria
                    subjectAndYearList[0].append(questionsGeom)

                elif(subject=="Geometria"):
                    questionsGeom = Question.objects.filter(subsubject=GEOMETRY).all()###Ciclo Exame de geometria
                    subjectAndYearList[0].append(questionsGeom)
    
            
        questionsExam = []
        numberOfQuestions=3
        index=0
        if(len(subjectAndYearList[1])!=0 and  len(subjectAndYearList[0])==0):
            for i in range(numberOfQuestions):

                questions = Question.objects.filter(year=subjectAndYearList[1][0]).all()
                choice = questions[random.randint(0, len(questions) - 1)]

                while choice in questionsExam:
                        
                    choice = questions[random.randint(0, len(questions) - 1)]
                questionsExam.append(choice)
        else:

            while(len(questionsExam)!=numberOfQuestions):
                                                 
                    choice = subjectAndYearList[0][index][random.randint(0, len(subjectAndYearList[0][index]) - 1)] 
                    while choice in questionsExam:
                        choice = subjectAndYearList[0][index][random.randint(0, len(subjectAndYearList[0][index]) - 1)]

                    questionsExam.append(choice)
                    if(index==len(request.POST.getlist('MultipleChoice'))-1):
                        index =0
                    
                    index += 1

        

        exame = Exam.objects.create()
        
        for question in questionsExam:
            exame.questions.add(question)

        return redirect("http://localhost:8000/exame/{}/render".format(exame.id))
        
    context = {}

    return render(request, "generate.html", context)

