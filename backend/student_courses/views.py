from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse
from .serializers import StudentCourseSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_users(request, is_student):
    is_student = StudentCourse.objects.filter(is_student=True)
    serializer = StudentCourseSerializer(is_student, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_or_change_grades(request, grade_received):
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST': #add grade
        serializer = StudentCourseSerializer(grade_received=request.grade_received)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'GET': #get their grade
        grade_received = StudentCourse.objects.filter(grade_received=request.grade_received)
        serializer = StudentCourseSerializer(grade_received, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE']) 
def change_grade_or_course(request, pk):
    grade_or_course= get_object_or_404(StudentCourse, pk=pk)
    if request.method == 'GET':
        serializer = StudentCourseSerializer(grade_or_course) 
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = StudentCourseSerializer(grade_or_course, data=request.data)
        serializer.is_valid(raise_exception= True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        grade_or_course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        