from django.shortcuts import render,get_object_or_404
from django.urls import reverse
from .models import Article
from .forms import ArticleForm
from django.views import View
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
    queryset = Article.objects.all() 
    def get_object(self):
        id_=self.kwargs.get("id")
        return get_object_or_404(Article,id=id_)

class ArticleCreateView(CreateView):
    template_name = 'blog/article_create.html'
    queryset = Article.objects.all()
    form_class = ArticleForm

class ArticleUpdateView(UpdateView):
    template_name = 'blog/article_create.html'
    queryset = Article.objects.all()
    form_class = ArticleForm

    def get_object(self):
        id_=self.kwargs.get("id")
        return get_object_or_404(Article,id=id_)
class ArticleDeleteView(DeleteView):
    template_name='blog/article_delete.html'
    ##No queryset since we don't need all items just one
    #success_url="/blog/list"
    def get_object(self):
        id_=self.kwargs.get("id")
        return get_object_or_404(Article,id=id_)
        
    def get_success_url(self):##Overridding the one that was predefined in the article model
        return reverse("blog:article_list")
 
### RAW Class Based views####
class CourseView(View):
    template_name="blog/list.html"
    queryset= Article.objects.all()
    def get_queryset(self):
        return self.queryset
    def get(self,request,*args, **kwargs):
        
        context ={
        'object_list':self.get_queryset()
    }
        return render(request,self.template_name,context)


def article_list_view(request):


    return render(request,"blog/list.html", {})












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

    

