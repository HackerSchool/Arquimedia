from django import forms
from .models import Person

class PersonForm (forms.ModelForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Please enter your first name'}))
    last_name  = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder': 'Please enter your family/last name'
    }))

    class Meta:
        model=Person
        fields=[
            'first_name',
            'last_name'
        ]
    def clean_first_name(self,*args,**kwargs):
        first_name=self.cleaned_data.get("first_name")
        if not first_name == first_name.capitalize():
            raise forms.ValidationError('Your name should be capitalized')
        return first_name
    def clean_last_name(self,*args,**kwargs):
        last_name=self.cleaned_data.get("last_name")
        if not last_name == last_name.capitalize():
            raise forms.ValidationError('Your name should be capitalized')
        return last_name


    

