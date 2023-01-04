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
User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def directory_of_students(request):
    """/api/auth/student_directory/  These are students with classes. GET users with courses
    """
    students = User.objects.all().filter(is_student=True)
    serializer = PersonObjectSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def grad_ready_candidates(request):
    """/api/auth/candidates/  students to be filtered by credits_received >=128 && gpa >=3
    """
    candidates = User.objects.filter(grad_ready=True)
    serializer = PersonObjectSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def put_calculate_credits_earned(request, user_id):
    """api/auth/put_calculate_credits_earned/

    PUT into AUTH/USER credits_earned
    """    
    credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    credits_earned = 0
    for credit in credit_tally:
        credits_earned += credit.credits_received
    try:
        credits_earned.save()
        serializer = PersonObjectSerializer(credits_earned, many=False)
        print('user_id', user_id)
        print('credit_tally', credit_tally)
        print('POST INTO CREDITS_EARNED: sum_of_credits', credits_earned)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        print('user_id', user_id)
        print('credit_tally', credit_tally)
        print('POST INTO CREDITS_EARNED: sum_of_credits', credits_earned)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def put_individual_graduation_eligibility(request, id):
    """api/auth/individual_graduation_eligibility/
    POST INTO grad ready
    """   
    student_gpa = User.objects.get(id=id).filter(gpa=user.gpa)
    serializer = PersonObjectSerializer(student_gpa, many=False)
    # return Response(serializer.data)  
    grad_ready = get_object_or_404(User, credits_earned=credits_earned)
    # credits_accrued = get_object_or_404(User, pk=course_id)
    grad_ready.credits_earned=request.data['credits_earned']
    print('grad ready credits_accrued', grad_ready)
    print('student_gpa', student_gpa )

    if int(grad_ready.credits_earned) >= 128:
        if student_gpa >= 3:
            grad_ready.grad_ready = 4
            print('student_gpa', student_gpa)
            print('if TRUE (4) credits_accrued.credits_earned', grad_ready.credits_earned)
            
    else:
        grad_ready.grad_ready = 0
        print('grad ready credits_accrued', grad_ready)
        print('ELSE (0) credits_accrued.credits_earned', grad_ready.credits_earned)
        print('ELSE (0) credits_accrued.grad_ready', grad_ready.grad_ready)

    try:
        grad_ready.save()
        serializer = PersonObjectSerializer(grad_ready)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)




@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def put_calculate_gpa(request, user_id):
    """api/auth/put_calculate_gpa/<int:user_id>/'
     
    PUT into AUTH/USER gpa
    """    
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=0)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa= sum_of_grades/len(graded_courses)
    try:
        gpa.save()
        serializer = PersonObjectSerializer(gpa, many=False)
        print('graded_courses', graded_courses)
        print('sum_of_grades', sum_of_grades)
        print('POST INTO: gpa', gpa)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        print('graded_courses', graded_courses)
        print('sum_of_grades', sum_of_grades)
        print('POST INTO: gpa', gpa)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def put_calculate_semester_by_credits(request, user_id):
    """api/student_courses/put_calculate_semester_by_credits/<int:user_id>/

    PUT into AUTH/USER semester
    """    
    passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    sum_of_credits = 0
    semester = 0
    for passed_course in passed_courses:
        sum_of_credits += passed_course.credits_received
        semester=(sum_of_credits//16)+1
    try:
        semester.save()
        serializer = PersonObjectSerializer(semester, many=False)
        print('users_courses', passed_courses)
        print('sum_of_credits', sum_of_credits)
        print('POST INTO SEMESTER: current_semester', semester)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        print('users_courses', passed_courses)
        print('sum_of_credits', sum_of_credits)
        print('POST INTO SEMESTER: current_semester', semester)
        return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def sum_credits_earned(request, user_id):
    """api/auth/sum_credits_earned/
    """   
    credits_accumulated = get_object_or_404(User, pk=user_id)
    credits_accumulated.credits_earned=request.data['credits_earned']
    try:
        credits_accumulated.save()
        serializer = PersonObjectSerializer(credits_accumulated)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def gpa_earned(request, user_id):
    """api/auth/put_gpa/<int:user_id>/', #stores GPA to DB
    """   
    calculated_gpa = get_object_or_404(User, pk=user_id)
    calculated_gpa.gpa=request.data['gpa']
    try:
        calculated_gpa.save()
        serializer = PersonObjectSerializer(calculated_gpa)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def current_semester(request, user_id):
    """api/auth/put_semester/<int:user_id>/', #stores semester to DB
    """   
    student_semester = get_object_or_404(User, pk=user_id)
    student_semester.semester=request.data['semester']
    try:
        student_semester.save()
        serializer = PersonObjectSerializer(student_semester)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def grad_status(request, user_id):
    """api/auth/put_grad_status/<int:user_id>/' #stores grad status to DB
    """   
    status_is_a_graduate = get_object_or_404(User, pk=user_id)
    status_is_a_graduate.grad_ready=request.data['grad_ready']
    try:
        status_is_a_graduate.save()
        serializer = PersonObjectSerializer(status_is_a_graduate)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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

