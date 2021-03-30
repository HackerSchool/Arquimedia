from django.db import models
from django.urls import reverse

class Article(models.Model):
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=500)
    author = models.CharField(max_length=30, default='Annonymus')
    def get_absolute_url(self):
        return reverse("blog:detail_page",kwargs={"id":self.id})