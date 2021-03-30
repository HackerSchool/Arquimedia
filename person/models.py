from django.db import models
from django.urls import reverse

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    points = models.DecimalField(max_digits=1000000, decimal_places=2, default=0.00)
    def get_absolute_url(self):
        return reverse("person:detail_page",kwargs={"id":self.id})
