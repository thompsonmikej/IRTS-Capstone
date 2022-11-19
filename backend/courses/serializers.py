from rest_framework import serializers
from .models import Student_Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student_Course
        fields = ['name', 'year_semester']