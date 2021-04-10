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