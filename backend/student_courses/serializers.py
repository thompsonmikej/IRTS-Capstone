from rest_framework import serializers
from .models import StudentCourse

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = ['student', 'course_id', 'grade_received', 'credits_received']
        depth = 1

        course_id = serializers.IntegerField(write_only=True)