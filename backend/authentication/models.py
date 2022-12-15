from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_student = models.BooleanField('Is student', default=False)
    semester = models.IntegerField(blank=True, null=True)
    gpa = models.FloatField(blank=True, null=True)
    credits_earned = models.IntegerField(blank=True, null=True) 
    grad_ready = models.BooleanField('Graduation ready', default=False)
   
    
