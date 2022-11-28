from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse
from .serializers import StudentCourseSerializer

# Create your views here.
#USERS

@api_view(['GET'])
@permission_classes([AllowAny])
def student_users(request):
    """/api/users/all/  These are students with classes. GET users with courses
    """
    student = StudentCourse.objects.all()
    serializer = StudentCourseSerializer(student, many=True)
    print('GET users with courses, all_student users', student)
    return Response(serializer.data)


# CREDITS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_credits(request):
    """/api/users/credits/get/all  
    """
    credit = StudentCourse.objects.filter(credits_received__gt=0)
    serializer = StudentCourseSerializer(credit, many=True)
    print('get_credits', credits_received)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_semester_credits(request):
    """/api/users/credits/get/<year_semester>/
    """
    # print(f'''get semester credits', {credits_received}''')
    credit = StudentCourse.objects.filter(credits_received=credits_received)
    serializer = StudentCourseSerializer(credit, many=True)
    print('get_semester_credits', credit)
    return Response(serializer.data)


# GRADES
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_grades(request):
    """api/users/grades/get
    """
    # this_grade = StudentCourse.objects.filter(grade_received=grade_received)
    serializer = StudentCourseSerializer(data=request.data)
    print('get grades')
    if serializer.is_valid():
        serializer.save()
        print('get grades')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/users/grades/gpa  ##USER?
    """
    gpa_received = StudentCourse.objects.filter(gpa__gte=0)
    serializer = StudentCourseSerializer(data=request.data)
    print('get GPA')
    if serializer.is_valid():
        serializer.save()
        print('get GPA', gpa_received)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])   #by name
def change_grades(request):
    """api/users/grades/change/
    """    
    grade_received = StudentCourse.objects.filter(grade_received=grade_received)
    print('POST change courses', grade_received)
    serializer = StudentCourseSerializer(data=request.data)
    print('change grades')
    if serializer.is_valid():
        serializer.save()
        print('POST change grades')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE']) 
def delete_grades(request):
    """api/users/grades/delete/
    """
    print('deleted grades')
    grade_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(grade_deleted) 
    return Response(serializer.data)


#COURSES

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_courses(request):
    """/api/courses/all/
    """
    course = StudentCourse.objects.all()
    serializer = StudentCourseSerializer(course, many=True)
    print('get_all_courses', course)
    return Response(serializer.data)

@api_view(['POST']) 
def change_courses(request):
    """api/users/courses/change/
    """
    serializer = StudentCourseSerializer(data=request.data)
    print('Postman body student_id, course_id')
    if serializer.is_valid():
        serializer.save()
        print('POST change courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def create_courses(request):
    """api/users/courses/new     
    """
    serializer = StudentCourseSerializer(data=request.data)
    print('create courses')
    if serializer.is_valid():
        serializer.save()
        print('create courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE']) 
def delete_courses(request):
    """api/users/courses/delete/
    """
    course_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(course_deleted) 
    print('delete_courses', course_deleted)
    return Response(serializer.data)



# @api_view(['GET', 'PUT', 'DELETE']) 
# def change_courses(request, pk):
#     """api/users/courses/change/
#     """
#     grade_or_course= get_object_or_404(StudentCourse, pk=pk)
#     if request.method == 'GET':
#         serializer = StudentCourseSerializer(grade_or_course) 
#         return Response(serializer.data)

        