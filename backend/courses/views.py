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
def get_available_courses(request):
    """api/courses/courses_available/  classes ungraded, available   
    """
    available_courses = Course.objects.all().filter(semester=request.user.semester)
    serializer = CourseSerializer(available_courses, many=True)
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
        
