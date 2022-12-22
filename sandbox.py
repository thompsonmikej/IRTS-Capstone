def passGradeCreditsEarned(grade_received, credit_value): 
    if (grade_received >= 2):
        print(credit_value)
        return credit_value
    else:
        credit_value = 0
        print(credit_value)
        return credit_value

passGradeCreditsEarned(2, 4)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_graded_courses(request):
    """api/student_courses/get_transcript/  
    """
    graded_courses = StudentCourse.objects.filter(user=request.user)
	
	passing_courses = []
	non_passing_courses = []
	
	for single_grade in graded_courses:
		if (single_grade["grade_recieved"] > 2):
			passing_courses.append(single_grade)
		else:
			non_passing_courses.append(single_grade)
	
	print('Passing courses', passing_courses)
	
	print('Non Passing courses', non_passing_courses)
	
	custom_dictionary_variable = {
		"passing_courses":  StudentCourseSerializer(passing_courses, many=True).data,
		"non_passing_courses": StudentCourseSerializer(non_passing_courses, many=True).data,
	}
	
    return Response(custom_dictionary_variable)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_graded_courses(request):
    """api/student_courses/get_graded_courses/  #2
    """
    graded_courses = StudentCourse.objects.filter(user=request.user)

	custom_transcripts = []
	
	for single_graded_course in graded_courses:
	
		credit_value_to_use = single_graded_course["course"]["credit_value"];
	
		if credit_value_to_use < 3:
			credit_value_to_use = 0
		
	
		custom_transcript_dictionary = {
			"user": {
				"id": single_graded_course["user"]["id"],
				"first_name": single_graded_course["user"]["first_name"],
			},
			"course": {
				"id": single_graded_course["course"]["id"],
				"credit_value": credit_value_to_use
			},
		}
		
		custom_transcripts.append(custom_transcript_dictionary)
	
    return Response(custom_transcripts)
