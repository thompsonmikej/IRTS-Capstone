from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse, User
from .serializers import StudentCourseSerializer, GradedCourseSerializer

# Create your views here.
#USERS


# Get all the logged in user's courses, aka transcript
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transcript(request):
    """api/student_courses/transcript/  TRANSCRIPT
    """
    user_received = StudentCourse.objects.filter(user=request.user)
    serializer = GradedCourseSerializer(user_received, many=True)
    print('get user by id', user_received)
    return Response(serializer.data)


#Get all studentcourses that need grades
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scheduled_studentcourses(request):
    """api/users/
    """
    user_received = StudentCourse.objects.filter(grade_received=None)
    serializer = GradedCourseSerializer(user_received, many=True)
    print('get user by id', user_received)
    return Response(serializer.data)


# GRADES

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/users/grades/gpa  ##USER?
    """
    #query for all studentcourses for logged in user, find the grades and average them
    gpa_received = StudentCourse.objects.filter(gpa__gte=0)
    serializer = StudentCourseSerializer(data=request.data)
    print('get GPA')
    if serializer.is_valid():
        serializer.save()
        print('get GPA', gpa_received)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Supply a grade & credits to an existing studentcourse
@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def change_grades(request, studentcourse_id):
    """api/student_courses/grade_change/
    """   
    existing_studentcourse = get_object_or_404(StudentCourse, pk=studentcourse_id) 
    existing_studentcourse.grade_received=request.data['grade_received']
    existing_studentcourse.credits_received=request.data['credits_received']
    try:
        existing_studentcourse.save()
        serializer = GradedCourseSerializer(existing_studentcourse)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

#COURSES

#Used for when a logged-in student registers for a new course
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_studentcourses(request):
    """api/student_courses/register_new_course/  FUNCTION TO ADD COURSE ON SCHEDULE
    """
    serializer = StudentCourseSerializer(data=request.data)
    print('create courses')
    if serializer.is_valid():
        serializer.save(user=request.user)
        print('create courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Not used
@api_view(['DELETE']) 
def delete_grades(request):
    """api/users/grades/delete/
    """
    print('deleted grades')
    grade_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(grade_deleted) 
    return Response(serializer.data)

#Not used
@api_view(['POST']) 
def change_studentcourses(request):
    serializer = StudentCourseSerializer(data=request.data)
    print('Postman body: student_id, course_id')
    if serializer.is_valid():
        serializer.save(user=request.user)
        print('POST change courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Not used
@api_view(['DELETE']) 
def delete_studentcourses(request):
    """api/users/courses/delete/
    """
    course_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(course_deleted) 
    print('delete_courses', course_deleted)
    return Response(serializer.data)


# How to get a user
# How to assign a course
# How to assign a grade




        