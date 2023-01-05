@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_data(request):
    """/api/auth/get_student_data/  students to be filtered by credits_received >=128 && gpa >=3
    """
    student_data = User.objects.filter(id=user_id)
    serializer = PersonObjectSerializer(student_data)
    return Response(serializer.data)
    
    
    student_data.semester 
    student_data.credits_earned 
    student_data.gpa 
    student_data.grad_ready 
    







# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])   
# def put_student_graduation_eligibility(request, user_id):
#     """api/auth/student_graduation_eligibility/
#     UPDATES grad_ready, GPA, semester, credits_earned
#     """   
#     student_object = User.objects.get(id=user_id)

#     graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=0)
#     sum_of_grades = 0
#     for grade in graded_courses:
#         sum_of_grades += grade.grade_received
#     gpa = sum_of_grades/len(graded_courses)

#     passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
#     sum_of_credits = 0
#     for passed_course in passed_courses:
#         sum_of_credits += passed_course.credits_received
#         semester=(sum_of_credits//16)+1

#     student_object.semester = semester
#     student_object.credits_earned = sum_of_credits
#     student_object.gpa = gpa   
    
#     if (sum_of_credits >= 128 and gpa >= 3):
#         student_object.grad_ready = True
#         print('student_gpa', gpa)
#         print('TRUE (4) sum_of_credits', sum_of_credits)
#         print('TRUE (4) is grad_ready', student_object.grad_ready)

#     else:
#         student_object.grad_ready = False
#         print('student_gpa', gpa)
#         print('ELSE (0) sum_of_credits', sum_of_credits)
#         print('ELSE (0) is grad ready', student_object.grad_ready)
#         print('semester', semester)
#         print('student object', student_object)
#         print('student object #', student_object.id)
#         print('ELSE (0) is student', student_object.is_student)

#     student_object.grad_ready
#     student_object.save()

#     serializer = PersonObjectSerializer(student_object)
#     return Response(serializer.data, status=status.HTTP_200_OK)

