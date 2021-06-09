from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

# Create your views here.
def signup(request):
    context = {}
    form = UserCreationForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            # if form is valid, user is created and logged in
            user = form.save()
            login(request, user)

            return redirect('/')

    context["form"] = form
    
    return render(request, "registration/signup.html", context)

@login_required
def profileDashboard(request):

    SUBJECT_LIST = ["Matemática", "Física-Química"]

    user = request.user

    context = {
        "user": user,
        "subjects": user.profile.subjects.all(),
        "userSubjects": [i.subject for i in user.profile.subjects.all()],
        "SUBJECT_LIST": SUBJECT_LIST
    }

    if(user.profile.subjects.all().count()!=0):
        for i in user.profile.subjects.all():
            x = (i.correctAnswers.count())/5
           
            index = 13.75*(x-30)**(1/3)+42.5
            context[i.id] = index
        

    return render(request, "dashboard.html", context)

