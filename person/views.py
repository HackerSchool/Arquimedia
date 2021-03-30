from django.shortcuts import render,get_object_or_404
from .models import Person
from .forms import PersonForm

def person_detail_view(request,id,*args, **kwargs):
    obj= get_object_or_404(Person,id=id)
    context={
        'object':obj
    }

    return render(request,"person/detail.html",context)
def person_create(request,*args, **kwargs):
    form= PersonForm(request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)
        form.save()
        form=PersonForm()
    else:
        print(form.errors)
    context={
        "form":form
    }
    return render(request,"person/person_create.html",context)

def render_initial_data(request):
    initial_data={
        'first_name':"Filipe",
        'last_name':"Ambrósio"
    }
    #obj= Product.objects.get(id=7)
    form = PersonForm(request.POST or None)
    if form.is_valid():
        form.save()
        form=PersonForm()
    context={
        'form':form
    }

    return render(request,"person/person_create.html", context)


def person_delete_view(request,id):
    obj=get_object_or_404(Person,id=id)
    if request.method=="POST":
        obj.delete() #confirming deletion
    context={
        "object":obj
    }

    return render(request,"person/person_delete.html", context)
    
def person_list_view(request):
    queryset =Person.objects.all()
    context ={
        'object_list':queryset
    }
    return render(request,"person/list.html", context)