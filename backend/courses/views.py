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
    all_courses = Course.objects.all()
    serializer = CourseSerializer(all_courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_courses_available(request, semester):
    """api/courses/courses_available/   
    """
    available_courses = Course.objects.exclude(semester__lt=semester).values()
    serializer = CourseSerializer(available_courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_course_credits(request, id):
    """api/courses/get_course_credits/    
    """
    course_credits = Course.objects.filter(id=id)
    serializer = CourseSerializer(course_credits, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])   
def post_create_courses(request):
    """api/courses/post_create_courses/
    """    
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        
@api_view(['DELETE']) 
def employee_deletes_courses(request, pk):
    """/api/courses/delete_courses/<int:pk>/
    """
    course= get_object_or_404(Course, pk=pk)
    course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)