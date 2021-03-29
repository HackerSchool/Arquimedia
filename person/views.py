from django.shortcuts import render
from .models import Person
def person_detail_view(request,*args, **kwargs):
    context={}
    for e in range (1,5):

        i=Person.objects.get(id=e)
        context[e]=i
    return render(request,"person/detail.html",context)
def person_create(request,*args, **kwargs):
    if request.method=='POST':
        my_name= request.POST.get('first name')
        my_family_name=request.POST.get('last name')
        Person.objects.create(first_name=my_name,last_name=my_family_name)
        


    return render(request,"person/person_create.html",{})

