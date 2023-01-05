from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse, User
from courses.models import Course
from .serializers import StudentCourseSerializer
from courses.serializers import CourseSerializer


#USERS
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
    scheduled_ungraded_courses = StudentCourse.objects.filter(user=request.user).filter(credits_received=0)
    serializer = StudentCourseSerializer(scheduled_ungraded_courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_views_studentcourses(request, user_id):
    """api/student_courses/admin_views_studentcourses/<int:user_id>/  
    """
    view_studentcourses = StudentCourse.objects.filter(user_id=user_id)
    serializer = StudentCourseSerializer(view_studentcourses, many=True)
    return Response(serializer.data)

# GRADES
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/users/grades/gpa 
    """
    gpa_received = StudentCourse.objects.filter(gpa__gte=0)
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def grade_course_object(request, student_course_id):
    """api/student_courses/grade_course_object/
    """      
    courses_to_grade = get_object_or_404(StudentCourse, pk=student_course_id)

    course = Course.objects.get(id=courses_to_grade.course_id)   

    courses_to_grade.grade_received=request.data['grade_received']
    print('courses_to_grade', courses_to_grade)

    if  int(courses_to_grade.grade_received) < 2:
        courses_to_grade.credits_received = 0
        print('courses_to_grade TRUE grade received)', courses_to_grade.grade_received)
        print('courses_to_grade TRUE credits received)', courses_to_grade.credits_received)
                
    else:
        courses_to_grade.credits_received = course.credit_value
        print('credit value', course.credit_value)
        print('courses_to_grade ELSE (>=2) (grade received)', courses_to_grade.grade_received)
        print('courses_to_grade ELSE (>=2) (credit value)', courses_to_grade.credits_received)
 
    try:
        courses_to_grade.save()
        serializer = StudentCourseSerializer(courses_to_grade)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


#COURSES
@api_view(['DELETE']) 
def delete_courses(request, pk):
    """/api/student_courses/delete_courses/<int:pk>/
    """
    course= get_object_or_404(StudentCourse, pk=pk)
    course.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_student_into_courses(request):
    """api/student_courses/enroll_student_into_courses/  
    """
    serializer = StudentCourseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_transcript(request):
    """api/student_courses/get_transcript/  
    """
    student_transcript = StudentCourse.objects.filter(user=request.user)
    serializer = StudentCourseSerializer(student_transcript, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_calculate_gpa(request, user_id):
    """api/student_courses/get_calculate_gpa/<int:user_id>/'
    """    
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=0)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa= sum_of_grades/len(graded_courses)
    print(grade.grade_received)
    return Response(gpa)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_graded_courses(request):
    """api/student_courses/get_graded_courses/
    """
    graded_courses = StudentCourse.objects.filter(user=request.user)
    serializer = StudentCourseSerializer(graded_courses, many=True)
    print('graded_courses', graded_courses)
    passing_courses = []
    failing_courses = []
    for single_course in graded_courses:
        print('single_course', single_course)
        if (single_course.grade_received > 2):
            passing_courses.append(single_course)
        else:
            failing_courses.append(single_course)
        
    print('Passing courses', passing_courses)
    print('Failing courses', failing_courses)
        
    custom_course_dictionary = {
		"passing_courses": StudentCourseSerializer(passing_courses, many=True).data,
		"failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
	}
    print('custom course dictionary', custom_course_dictionary)
    return Response(custom_course_dictionary)
