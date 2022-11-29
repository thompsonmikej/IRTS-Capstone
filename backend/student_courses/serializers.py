from rest_framework import serializers
from .models import StudentCourse

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = ['student', 'course', 'student_id', 'course_id']
        depth = 1

    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)

class GradedCourseSerializer(serializers.ModelSerializer):
    """api/users/grades/get;  api/users/grades/change/;  
    """
    class Meta:
        model = StudentCourse
        fields = ['course', 'student', 'course', 'grade_received', 'credits_received']

# class CourseCreditSerializer(serializers.ModelSerializer):
#     """api/users/credits/get/all 
#     """
#     class Meta:
#         model = StudentCourse
#         fields = ['student', 'course', 'credits_received']



        