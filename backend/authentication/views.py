from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, PersonObjectSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from student_courses.serializers import StudentCourseSerializer
from courses.serializers import CourseSerializer
from student_courses.models import StudentCourse, User
from courses.models import Course
from .models import User
User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_student_directory(request):
    """/api/auth/get_student_directory/  These are students with classes. GET users with courses
    """
    students = User.objects.all().filter(is_student=True)
    serializer = PersonObjectSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def grad_ready_candidates(request):
    """/api/auth/candidates/  
    """
    candidates = User.objects.filter(grad_ready=True)
    serializer = PersonObjectSerializer(candidates, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_student_data(request, user_id):
#     """/api/auth/get_student_data/
#     """
#     student_data = User.objects.filter(id=user_id)
#     serializer = PersonObjectSerializer(student_data, many=True)
#     return Response(serializer.data)
    
@api_view(['GET'])
def get_current_semester(request, user_id):
    """api/auth/current_semester/'
    """    
    student_object = User.objects.get(id=user_id)
    passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    sum_of_credits = 0
    for passed_course in passed_courses:
        sum_of_credits += passed_course.credits_received
        semester=(sum_of_credits//16)+1
    return Response(semester)


@api_view(['GET'])
def get_current_credits(request, user_id):
    """api/auth/get_current_credits/'
    """    
    student_object = User.objects.get(id=user_id)
    passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    sum_of_credits = 0
    for passed_course in passed_courses:
        sum_of_credits += passed_course.credits_received
    return Response(sum_of_credits)
    

@api_view(['GET'])
def get_current_gpa(request, user_id):
    """api/auth/get_current_gpa/'
    """        
    student_object = User.objects.get(id=user_id)
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=0)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa = sum_of_grades/len(graded_courses)
    return Response(gpa)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def put_student_graduation_eligibility(request, user_id):
    """api/auth/student_graduation_eligibility/
    UPDATES grad_ready, GPA, semester, credits_earned
    """   
    student_object = User.objects.get(id=user_id)

    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received = 0 )
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa = sum_of_grades/len(graded_courses)

    passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    sum_of_credits = 0
    for passed_course in passed_courses:
        sum_of_credits += passed_course.credits_received
        semester=(sum_of_credits//16)+1

    student_object.semester = semester
    student_object.credits_earned = sum_of_credits
    student_object.gpa = gpa   
    
    if (sum_of_credits >= 128 and gpa >= 3):
        student_object.grad_ready = True
    else:
        student_object.grad_ready = False

    student_object.grad_ready
    student_object.save()

    serializer = PersonObjectSerializer(student_object)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def student_status(request, user_id):
    """api/auth/post_student_status/<int:user_id>/' #stores student status to DB
    """   
    is_current_student = get_object_or_404(User, pk=user_id)
    is_current_student.is_student=request.data['is_student']
    try:
        is_current_student.save()
        serializer = PersonObjectSerializer(is_current_student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

