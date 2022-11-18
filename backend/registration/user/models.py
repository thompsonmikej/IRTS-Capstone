from django.db import models
from course.models import Course
from student_course.models import Student_Course

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_student = models.BooleanField()
    semester = models.IntegerField(max_length=9) 
    gpa = models.FloatField()
    credits_earned = models.IntegerField(max_length=3) 
    grad_ready = models.BooleanField()
