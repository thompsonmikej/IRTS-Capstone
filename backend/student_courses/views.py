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
    """api/student_courses/scheduled  FINDS UNGRADED COURSES ON STUDENT SCHEDULE
    """
    ungraded_courses = StudentCourse.objects.filter(grade_received=None)
    serializer = GradedCourseSerializer(ungraded_courses, many=True)
    print('get scheduled courses', ungraded_courses)
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
    """api/student_courses/register_new_course/  FUNCTION TO ADD COURSE ONTO SCHEDULE
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


@api_view(['GET'])
def calculate_gpa(request, user_id):
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=None)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa= sum_of_grades/len(graded_courses)
    return Response(gpa)


@api_view(['GET'])
def calculate_credits_earned(request, user_id):
    credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=None)
    sum_of_credits = 0
    for credit in credit_tally:
        sum_of_credits += credit.credits_received
    return Response(sum_of_credits)


@api_view(['GET'])
def calculate_semester_by_credits(request, user_id):
    credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=None)
    sum_of_credits = 0
    current_semester = 0
    for credit in credit_tally:
        sum_of_credits += credit.credits_received
        if sum_of_credits <=11:
            current_semester = 7
        elif(sum_of_credits >11 and sum_of_credits <=23):
            current_semester = 8
    return Response(current_semester)





# @api_view(['GET'])
# def calculate_graduation_ready(request, user_id):
#     credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=None)
#     graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=None)
#     sum_of_credits = 0
#     sum_of_grades = 0
#     enough_credits = False
#     valid_gpa = False
#     for credit in credit_tally:
#         sum_of_credits += credit.credits_received
#         print('sum_of_credits',sum_of_credits)
#         if sum_of_credits >=24:
#             enough_credits = True
#             print('enough_credits', enough_credits)
#             for grade in graded_courses:
#                 sum_of_grades += grade.grade_received
#                 print('sum_of_grades', sum_of_grades)
#                 gpa= sum_of_grades/len(graded_courses)
#                 print('gpa', gpa)
#                 if gpa >=3:
#                     valid_gpa = True
#                 print('valid_gpa', valid_gpa)

#     return Response(valid_gpa)


