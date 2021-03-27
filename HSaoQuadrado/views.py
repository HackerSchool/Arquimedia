from django.shortcuts import redirect, render



def index(request):
    return render(request, "index.html")


def question(request,*args,**kwargs):
    context={
        "usermame" : request.user,
        "magicnumber" :777
    }

    
    if request == "POST":
        pass

    if request.GET.get("submit"):
        context["answer"] = request.GET.get("answer")
    return render(request, "form.html", context)
   