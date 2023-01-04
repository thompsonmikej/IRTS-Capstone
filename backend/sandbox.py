@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def put_individual_graduation_eligibility(request, id):
    """api/auth/individual_graduation_eligibility/
    POST INTO grad ready
    """   
    graded_courses = StudentCourse.objects.filter(user_id=user_id).exclude(grade_received=0)
    sum_of_grades = 0
    for grade in graded_courses:
        sum_of_grades += grade.grade_received
    gpa= sum_of_grades/len(graded_courses)

    passed_courses = StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
    sum_of_credits = 0
    for passed_course in passed_courses:
        sum_of_credits += passed_course.credits_received
    
    grad_ready.is_grad_ready = 0

    if (sum_of_credits >= 128 and gpa >= 3):
        grad_ready.grad_ready = 4
        print('student_gpa', gpa)
        print('TRUE (4) credits_accrued.credits_earned', grad_ready.sum_of_credits)
        print('TRUE (0) credits_accrued.grad_ready; not grad_ready', grad_ready.is_grad_ready)

    else:
        grad_ready.is_grad_ready
        print('student_gpa', gpa)
        print('ELSE (0) credits_accrued.credits_earned ; not grad_ready', grad_ready.sum_of_credits)
        print('ELSE (0) credits_accrued.grad_ready; not grad_ready', grad_ready.is_grad_ready)

    try:
        serializer = PersonObjectSerializer(grad_ready)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
