from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse, User
from courses.models import Course
from .serializers import StudentCourseSerializer
from courses.serializers import CourseSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transcript(request):
    """api/student_courses/get_transcript/  
    """
    student_transcript = StudentCourse.objects.filter(user=request.user)
    serializer = StudentCourseSerializer(student_transcript, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scheduled_courses(request):
    """api/student_courses/get_scheduled_courses
    """
    scheduled_ungraded_courses = StudentCourse.objects.filter(user=request.user).filter(credits_received=None)
    serializer = StudentCourseSerializer(scheduled_ungraded_courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_gets_studentcourses(request, user_id):
    """api/student_courses/admin_gets_studentcourses/<int:user_id>/  
    """
    get_studentcourses = StudentCourse.objects.filter(user_id=user_id)
    serializer = StudentCourseSerializer(get_studentcourses, many=True)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def put_grade_course_object(request, student_course_id):
    """api/student_courses/put_grade_course_object/
    """      
    courses_to_grade = get_object_or_404(StudentCourse, pk=student_course_id)

    course = Course.objects.get(id=courses_to_grade.course_id)   

    courses_to_grade.grade_received=request.data['grade_received']
 
    if  int(courses_to_grade.grade_received) < 2:
        courses_to_grade.credits_received = 0           
    else:
        courses_to_grade.credits_received = course.credit_value
 
    try:
        courses_to_grade.save()
        serializer = StudentCourseSerializer(courses_to_grade)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE']) 
def delete_courses(request, pk):
    """/api/student_courses/delete_courses/<int:pk>/
    """
    course= get_object_or_404(StudentCourse, pk=pk)
    course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_student_into_courses(request):
    """api/student_courses/post_student_into_courses/  
    """
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_graded_courses(request):
#     """api/student_courses/get_graded_courses/
#     """
#     graded_courses = StudentCourse.objects.filter(user=request.user)
#     serializer = StudentCourseSerializer(graded_courses, many=True)
#     passing_courses = []
#     failing_courses = []
#     for single_course in graded_courses:
#         if (single_course.grade_received > 2):
#             passing_courses.append(single_course)
#         else:
#             failing_courses.append(single_course)
        
#     custom_course_dictionary = {
# 		"passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
# 		"failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
# 	}
#     return Response(custom_course_dictionary)

