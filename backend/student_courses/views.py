from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse
from .serializers import StudentCourseSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_user_courses(request):
    student_course = StudentCourse.objects.all()
    serializer = StudentCourseSerializer(student_courses, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_user_grades(request):
    # print(
    #     'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = StudentCourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        student_course = StudentCourse.objects.filter(user_id=request.user.id)
        serializer = StudentCourseSerializer(student_courses, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE']) 
def change_grade_or_course(request, pk):
    grade_or_course= get_object_or_404(StudentCourse, pk=pk)
    if request.method == 'GET':
        serializer = StudentCourseSerializer(student_courses) 
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = StudentCourseSerializer(student_courses, data=request.data)
        serializer.is_valid(raise_exception= True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == 'DELETE':
        student_courses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)