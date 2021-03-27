from django.shortcuts import redirect, render



def index(request):
    return render(request, "index.html")


def question(request):
    
    if request == "POST":
        pass

    if request.GET.get("submit"):
        answer = request.GET.get("answer")

        print(answer)


    return render(request, "form.html")
   