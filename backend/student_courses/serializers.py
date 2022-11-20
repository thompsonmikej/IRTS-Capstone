from rest_framework import serializers
from .models import StudentCourse

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = ['student', 'course', 'grade_received', 'credits_received']