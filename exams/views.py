from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def test_exam_creation(request):

    if (request.method == "GET"):
        coiso = request.GET.get("teste")
        if coiso:
            return HttpResponse(coiso)

    return HttpResponse("Ola")