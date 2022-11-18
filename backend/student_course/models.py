from django.db import models
from authentication.models import User
from courses.models import Course

# Create your models here.
class Student_Course(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE) 
    course = models.ForeignKey(Course, on_delete=models.CASCADE) 
    grade_received = models.IntegerField(max_length=1) 
    credits_received = models.IntegerField(max_length=1) 

