
def put_individual_graduation_eligibility(gpa, id,credits_earned):
    gpa=gpa
    id=id
    credits_earned
    # student_gpa = User.objects.filter(id=id).get(gpa=gpa)
    # serializer = PersonObjectSerializer(student_gpa, many=False)
    # # return Response(serializer.data)  
    # grad_ready = get_object_or_404(User, credits_earned=credits_earned)
    # # credits_accrued = get_object_or_404(User, pk=course_id)
    # grad_ready.credits_earned=request.data['credits_earned']
    # print('credits_accrued', grad_ready)
    # print('student_gpa', student_gpa )
    grad_ready= 0

    if (credits_earned >= 128 and gpa >= 3):
            grad_ready = 4
            print('student_gpa', gpa)
            print('credits_earned', credits_earned)
            print('if TRUE (4) credits_accrued.credits_earned; grad_ready', grad_ready)
            return grad_ready
        # else:
        #     print('student_gpa', gpa)
        #     print('credits_earned', credits_earned)
        #     print('if ELSE (0) credits_accrued.credits_earned; not grad_ready', grad_ready)
        #     return grad_ready
    else:
        print('student_gpa', gpa)
        print('not enough credits_earned', credits_earned)
        print('if ELSE (0) credits_accrued.credits_earned; not grad_ready', grad_ready)
        return grad_ready
    # try:
    #     grad_ready.save()
    #     # # serializer = PersonObjectSerializer(grad_ready)
    #     # return Response(serializer.data, status=status.HTTP_200_OK)
    # return grad_ready
    # except:
    #     return grad_ready
    #     # return Response(status=status.HTTP_400_BAD_REQUEST)

put_individual_graduation_eligibility(2.5, 5, 128)

# # ##
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])   
# def put_calculate_credits_earned(request, user_id):
#     credit_tally= StudentCourse.objects.filter(user_id=user_id).exclude(credits_received=0)
#     sum_of_credits = 0
#     for credit in credit_tally:
#         sum_of_credits += credit.credits_received
#     try:
#         sum_of_credits.save()
#         serializer = StudentCourseSerializer(sum_of_credits)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except:
#         return Response(status=status.HTTP_400_BAD_REQUEST)

