from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, GradReadySerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
User = get_user_model()

class MyTokenObtainPairView(TokenObtainPairView):

    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def student_users(request):
#     """/api/auth/enrolled/  These are students with classes. GET users with courses
#     """
#     students = User.objects.filter(is_student=True)
#     serializer = RegistrationSerializer(students, many=True)
#     print('GET users with courses, all_student users', students)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def student_users(request):
    """/api/auth/enrolled/  These are students with classes. GET users with courses
    """
    students = User.objects.all().exclude(semester=None).exclude(semester=0)
    serializer = GradReadySerializer(students, many=True)
    print('GET users with courses, all_student users', students)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def grad_ready_users(request):
    """/api/auth/grads/  students to be filtered by credits_received >=24 && gpa >=3
    """
    print(f'''students to be filtered by above 24 and gpa above 3 ''')
    graduate = User.objects.filter(grad_ready=True)
    serializer = GradReadySerializer(graduate, many=True)
    print('grad ready_users', graduate)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_students(request):
    """/api/auth/all_students/  
    """
    all_students = User.objects.filter(is_student=True)
    print('get all students ', all_students)
    serializer = RegistrationSerializer(all_students, many=True)
    return Response(serializer.data)



    # Store credits earned to an existing student in auth userDB
@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def sum_credits_earned(request, user_id):
    """api/auth/sum_credits_earned/
    """   
    credits_accumulated = get_object_or_404(User, pk=user_id)
    print('sum credits earned', user_id) 
    credits_accumulated.credits_earned=request.data['credits_earned']
    try:
        credits_accumulated.save()
        serializer = GradReadySerializer(credits_accumulated)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def gpa_earned(request, user_id):
    """api/auth/post_gpa/<int:user_id>/', #stores GPA to DB
    """   
    calculated_gpa = get_object_or_404(User, pk=user_id)
    print('gpa', user_id) 
    calculated_gpa.gpa=request.data['gpa']
    try:
        calculated_gpa.save()
        serializer = GradReadySerializer(calculated_gpa)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def current_semester(request, user_id):
    """api/auth/post_semester/<int:user_id>/', #stores semester to DB
    """   
    student_semester = get_object_or_404(User, pk=user_id)
    print('semester', user_id) 
    student_semester.semester=request.data['semester']
    try:
        student_semester.save()
        serializer = GradReadySerializer(student_semester)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def grad_status(request, user_id):
    """api/auth/post_grad_status/<int:user_id>/' #stores grad status to DB
    """   
    is_grad = get_object_or_404(User, pk=user_id)
    print('grad ready', user_id) 
    is_grad.grad_ready=request.data['grad_ready']
    try:
        is_grad.save()
        serializer = GradReadySerializer(is_grad)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])   #by name
def student_status(request, user_id):
    """api/auth/post_student_status/<int:user_id>/' #stores grad status to DB
    """   
    is_current_student = get_object_or_404(User, pk=user_id)
    print('is_student', user_id) 
    is_current_student.is_student=request.data['is_student']
    try:
        is_current_student.save()
        serializer = GradReadySerializer(is_current_student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)