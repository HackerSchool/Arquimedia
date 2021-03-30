from django import forms
from .models import Article

class ArticleForm (forms.ModelForm):
    title = forms.CharField()
    content  = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Please write your article here',
        'width': 1000, 
        'height': 2000
    }))
    author =forms.CharField() 

    class Meta:
        model=Article
        fields=[
            'title',
            'content',
            'author'

        ]
    def clean_title(self,*args,**kwargs):
        title=self.cleaned_data.get("title")
        if not title == title.capitalize():
            raise forms.ValidationError('Your title should be capitalized only on the first letter')
        return title
    def clean_author(self,*args,**kwargs):
        author=self.cleaned_data.get("author")
        if not author == author.capitalize():
            raise forms.ValidationError('Your name should be capitalized')
        return author


    

