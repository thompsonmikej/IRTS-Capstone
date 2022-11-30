from django.db import models


# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=255)
    credit_value = models.IntegerField(blank=True, null=True)
    semester = models.CharField(max_length=255)
   
