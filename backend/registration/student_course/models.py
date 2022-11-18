from django.db import models

# Create your models here.
class Student_Course(models.Model):
    grade_received = models.IntegerField(max_length=1) 
    credits_received = models.IntegerField(max_length=1) 