from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'name', 'year_semester']
        depth = 1

course_id = serializers.IntegerField(write_only=True)

