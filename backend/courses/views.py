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
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_available_courses(request, year_semester): 
    courses = Course.objects.filter(year_semester=request.user.year_semester)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_transcript(request, year_semester): 
    courses = Course.objects.filter(year_semester__lt=request.user.year_semester)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_available_courses(request, year_semester): 
    courses = Course.objects.filter(year_semester=request.user.year_semester)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_courses(request, name): 
    courses = Course.objects.filter(name=request.user.name)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])   #by name
def find_or_change_courses(request):
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        courses = Course.objects.filter(data=request.data)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

