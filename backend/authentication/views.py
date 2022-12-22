from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, PersonObjectSerializer
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


@api_view(['GET'])
@permission_classes([AllowAny])
def student_users(request):
    """/api/auth/directory/  These are students with classes. GET users with courses
    """
    students = User.objects.all().exclude(semester=None).exclude(semester=0)
    serializer = PersonObjectSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def grad_ready_users(request):
    """/api/auth/candidatesdates/  students to be filtered by credits_received >=128 && gpa >=3
    """
    potential_graduates = User.objects.filter(grad_ready=True)
    serializer = PersonObjectSerializer(potential_graduates, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_students(request):
    """/api/auth/all_students/  
    """
    all_students = User.objects.filter(is_student=True)
    serializer = RegistrationSerializer(all_students, many=True)
    return Response(serializer.data)


    # Store credits earned to an existing student in auth userDB
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

