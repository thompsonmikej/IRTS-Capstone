# def get_graded_courses(request):
#     """api/student_courses/get_graded_courses/
#     """
#     # graded_courses = StudentCourse.objects.filter(user=request.user)
#     # print(graded_courses)
courses=[0,1,2,3,4,5]
print('course list', courses)
passing_courses = []
failing_courses = []
for single_course in courses:
    if (single_course > 3):
        passing_courses.append(single_course)
        # print(passing_courses)
        # return(passing_courses)        
    else:
        failing_courses.append(single_course)
        # print(failing_courses)
        # return(failing_courses)
    
print('Passing courses', passing_courses)
print('Failing courses', failing_courses)
    
# custom_course_dictionary = {
# 	# "passing_courses":  StudentCourseSerializer(passing_courses, many=True).data,
# 	# "failing_courses": StudentCourseSerializer(failing_courses, many=True).data,
# 	"passing_courses": (passing_courses).data,
# 	"failing_courses": (failing_courses).data,
# }
# # return Response(custom_course_dictionary)
# print(custom_course_dictionary)
