from django.shortcuts import render,get_object_or_404
from .models import Article
from .forms import ArticleForm
from django.views.generic import (
    CreateView,
    DetailView,
    ListView,
    UpdateView,
    ListView,
    DeleteView
)

#####Class Based Views####
class ArticleListView(ListView):
    template_name = 'blog/list.html'
    queryset = Article.objects.all() # the default template route is <blog>/<modelname>_list.html

class ArticleDetailView(DetailView):
    template_name = 'blog/detail.html'
    queryset = Article.objects.all() # the default template route is <blog>/<modelname>_list.html

















#####Function Based Views#####
def article_create(request,*args, **kwargs):
    form= ArticleForm(request.POST or None)
    if form.is_valid():
        print(form.cleaned_data)
        form.save()
        form=ArticleForm()
    else:
        print(form.errors)
    context={
        "form":form
    }
    return render(request,"blog/article_create.html",context)

def article_detail_view(request,id,*args, **kwargs):
    obj= get_object_or_404(Article,id=id)
    context={
        'object':obj
    }

    return render(request,"blog/detail.html",context)

def article_delete_view(request,id):
    obj=get_object_or_404(Article,id=id)
    if request.method=="POST":
        obj.delete() #confirming deletion
    context={
        "object":obj
    }

    return render(request,"blog/article_delete.html", context)
    
def article_list_view(request):
    queryset =Article.objects.all()
    context ={
        'object_list':queryset
    }
    return render(request,"blog/list.html", context)

    

