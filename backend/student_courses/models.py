from django.db import models
from authentication.models import User
from courses.models import Student_Course

# Create your models here.
class StudentCourse(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE) 
    course = models.ForeignKey(Student_Course, on_delete=models.CASCADE) 
    grade_received = models.IntegerField() 
    credits_received = models.IntegerField() 

