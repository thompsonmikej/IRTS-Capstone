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
    students = User.objects.filter(semester__gt=0)
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