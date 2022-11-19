from django.db import models


# Create your models here.
class Student_Course(models.Model):
    name = models.CharField(max_length=255)
    year_semester = models.IntegerField()
    
    # SEMESTER 8, name:
#     8 THESIS, 4 CR
#      8 SNR_PRJCT, 4 CR
#      8 ELECTIVE, 3 CR
#   8 BUSN_SKLLS, 3 CR
 
#  SEMESTER 7, name:
#     7 THESIS_PREP, 4 CR
#      7 JNR_PRJCT, 4 CR
#      7 ELECTIVE, 3 CR
#   7 CODNG_SKLLS, 3 CR
