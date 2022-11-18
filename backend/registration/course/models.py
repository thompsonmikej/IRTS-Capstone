from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=255)
    year_semester = models.IntegerField(max_length=1) 