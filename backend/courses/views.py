from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Course
from .serializers import CourseSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_courses(request):
    """api/courses/all
    """
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_available_courses(request, semester):
    """api/course/available/<semester>/
    """ 
    courses = Course.objects.filter(semester=semester)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])   #by name
def find_courses(request):
    """api/courses/find
    """
    courses = Course.objects.filter(data=request.data)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_studentcourses(request):
    """api/courses/current/
    """
    current_available = Course.objects.filter(semester__gt=7)
    serializer = CourseSerializer(current_available, many=True)
    print('get current courses', current_available)
    return Response(serializer.data)

    


@api_view(['POST'])
@permission_classes([IsAuthenticated])   
def create_courses(request):
    """api/courses/create
    """    
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])   #by name  
def delete_courses(request, name):
    """api/courses/delete/<name>/
    """  
    course = get_object_or_404(Course, name=name)
    course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    