from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer, StudentSerializer
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
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/auth/grades/gpa  ##USER?
    """
    student_gpa = User.objects.filter(gpa__gte=0)
    serializer = StudentSerializer(data=request.data)
    print('get GPA')
    if serializer.is_valid():
        serializer.save()
        print('get GPA', student_gpa)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def grad_ready_users(request):
    """/api/auth/grads/  students filtered by credits_received >=124 && gpa >3
    """
    print(f'''students to be filtered by above 124 and gpa above 3 ''')
    graduate = User.objects.filter(grad_ready=True)
    serializer = StudentSerializer(graduate, many=True)
    print('grad ready_users', graduate)
    return Response(serializer.data)
