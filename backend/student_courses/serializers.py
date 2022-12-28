from rest_framework import serializers
from .models import StudentCourse

class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = ['id', 'user', 'course', 'user_id', 'course_id', 'grade_received', 'credits_received']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)







        