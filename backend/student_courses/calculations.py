# User
# first_name
# last_name - charfield
# is_student - boolean = [True or False]
# year_semester - double = [7, 8]
# gpa - double #calcated below
# credits_earned - double  #calcated below
# grad_ready - boolean  = [True or False]

# user, for demonstration purposes begins with a default of 80 credits


# Course
# name = ['Thesis', 'Project', 'Business', 'Elective']
# credits = [3, 4]
# semester = [7, 8]

# Student_course
# student FK
# course FK
# grade_received   #calcated below
# credits_received   #calcated below


# def user_or_employee(user_status, determine_semester, gpa_calc, credits_accum , ready_to_graduate):
#     is_student = user_status
#     if is_student= True:
#         year_semester = determine_semester
#         gpa = gpa_calc
#         credits_earned = credits_accum
#         grad_ready = ready_to_graduate
#     else:
#         year_semester = 'null'
#         gpa = 'null'
#         credits_earned = 'null'
#         grad_ready = 'null'

# account_status = user_or_employee(detemine_semester, gpa_calc, credits_accum, ready_to_graduate)

def credits_to_graduate():
    """Number of credits required for graduation
    """    
    minimum_credits_to_graduate = 124
    return minimum_credits_to_graduate

credits_required = credits_to_graduate()


def semester(course_credits_accumulated, credits_required):
    """Assigns the grade level based on number of credits accumulated. The upper threshold is determined in credits_to_graduate function
    """    
    lower_credits_limit = 111
    if course_credits_accumulated >= lower_credits_limit and course_credits_accumulated < credits_required:
        print('Based on the credit total, student is in semester 8')
        return(801)
    else:
        print('Based on the credit total, student is in semester 7')
        return(701)

determine_semester= semester(100, credits_required)

# determine the credit ranges of a semester based on the number of credits

def graduation_ready(gpa, credits_earned, credits_required, determine_semester):
    """Determines graduation eligibility on three criteria: gpa over 3.0, credit requirements, and semester level
    """    
    minimum_gpa = 3.0
    if gpa >= minimum_gpa and credits_earned >= credits_required and determine_semester== 801:
        print('Eligible for graduation.')
        return True
    else:
        print('Not ready.')
        return False

ready_to_graduate = graduation_ready(3.1, 126, determine_semester, credits_required)

def how_many_objects():
    """User specifies the number of objects to update in this series.
    """    
    i = 0
    objects= int(input('How many courses would you like to add, up to 4? \nPlease enter a number from 1-4. Or enter 0 to restart.\n'))
    if objects > 0 and objects <=4:
        for i in range(objects):
            i += 1
            print('Number of objects: ', i)
            
    elif objects == 0:
        user_confirm = input('Start over completely? You will lose all progress. \nAre you sure? y/n?\n').lower()
        if user_confirm == 'y':
            print('** ** CREATE A GO BACK to start function ** **')
            pass
        else:
            return how_many_objects()
    else:
        print('Please re-enter a number within the range. Thanks.')
        return how_many_objects()

number_of_objects = how_many_objects()



#import math
# import statistics 
# calculate average value
# print(statistics.mean([1, 3, 5, 7, 9, 11]))

# confirm that the number is a number (not isNaN)
# print (math.isnan (+45.34))
# print (math.isnan (float("nan")))



# def calculate_GPA()
# gpa =
# courses_taken = []
# grades_accumulated / int(len(courses_taken))
# grades_accumulated += grade_received   # Adds current grade to the gpa
# https://stackoverflow.com/questions/9039961/finding-the-average-of-a-list 
# For Python 3.4+, use statistics.mean for numerical stability with floats. (Slower.)

# xs = [15, 18, 2, 36, 12, 78, 5, 6, 9] #credits per class

# import statistics
# statistics.mean(xs)  # = 20.11111111111111
# sum(xs)/ len(xs)


def transcript_creator():
    """Part 1, This builds the blank transcript.
    """
    course_tally = []
    print('Courses on your transcript: course tally (starts blank). ', course_tally)
    return course_tally

transcript_for_output= transcript_creator()


def courses_taken(chosen_subject, transcript_for_output):
    """This builds a personalized transcript of courses taken by the student
    """    
    this_transcript= transcript_for_output
    print('This is a transcript of courses taken. ', this_transcript)
    this_transcript.append(chosen_subject)
    print('This is a transcript of courses taken. ', this_transcript)
    return this_transcript


student_transcript = courses_taken('ENG', transcript_for_output)




#filter the transcript for current grade report or prior


def choose_grade():
    """Returns a grade. Specify the course in another function--
    """
    grades = ['D', 'C', 'B', 'A']
    
    selected_grade = grades[(int(input('''Grade the student earned. Enter the corresponding number.
        4 : A
        3 : B
        2 : C
        1 : D
        ''')))-1]

    index = grades.index(selected_grade)+1
    if grades == 1 or 2 or 3 or 4:
        print('On the grade report, the letter value is ', selected_grade, ' and the grade point value is ', index)
        return (selected_grade, index)
    else:
        print('Please re-enter a number within the range.')
        return choose_grade()

grade_applied = choose_grade()


def award_course_credits(numeric_grade, credits_attempted):
    """First part, awards credit for a course based on earning at least two grade points.
    """
    grade_points_earned = numeric_grade
    if grade_points_earned >= 2:
        print('Grade points earned: ', grade_points_earned )
        return credits_attempted
    else:
        credits_attempted = 0
        print('Grade points earned: ', grade_points_earned )
        return credits_attempted

credits_earned_per_course = award_course_credits(3.1, 4)


def calculate_credits_accumulated(credits_earned_per_course, previous_credits):
    """Second part, calculates total credits awarded.
"""
    credit_tally = int(credits_earned_per_course + previous_credits)
    print('Total credits accumulated (credit_tally): ', credit_tally)
    return credit_tally
 
course_credits_accumulated = calculate_credits_accumulated(
    credits_earned_per_course, 92)



def choose_a_semester(): 
    """First part, begins a course object with the semester number.
    """
    select_semester = int(input("Select for the student:\nSenior semester 7, enter '7'\nSenior semester 8, enter '8'\n"));
    if select_semester == 7:
        return(701)
    elif select_semester == 8:
        return(801)
    else:
        print('Please re-enter a number within the range.')
        return choose_a_semester()

select_semester = choose_a_semester()

#choose semester only once, choose each course once
# print to log.txt-- transcript

def course_subjects():
    cases = ['Thesis ', 'Project ', 'Business ', 'Elective ']
    return cases
available_courses = course_subjects()

def choose_a_subject(select_semester, available_courses):
    """Second part, completes a course object by applying the subject and credit value to the course level (select_semester).
    """    
    course_selections= available_courses
    three_credits = 3
    four_credits = 4
    user_choice = input(
        f'''Select the student's classes:\nThesis, credits: {four_credits}, enter '1' \nProject, credits: {four_credits}, enter '2' \nBusiness, credits: {three_credits}, enter '3' \nElective, credits: {three_credits}, enter '4' \n''').lower()
    match user_choice:
        case '1':
            print(course_selections[0], select_semester, ', credits: ', four_credits, ' was added to your schedule.')
            return(select_semester , course_selections[0] , four_credits)
        case '2':
            print(course_selections[1], select_semester, ', credits: ', four_credits, ' was added to your schedule.')
            return (select_semester, course_selections[1], four_credits)
        case '3':
            print(course_selections[2], select_semester, ', credits: ', three_credits, ' was added to your schedule.')
            return(select_semester , course_selections[2] , three_credits)
        case '4':
            print(course_selections[3], select_semester, ', credits: ', three_credits, ' was added to your schedule.')
            return(select_semester , course_selections[3] , three_credits)
        case _:
          # Prompt user again. Another instance of recursion
            return choose_a_subject(select_semester)

chosen_subject = choose_a_subject(select_semester, available_courses)



def grade_for_subject(chosen_subject, grade_applied):
    """Creates an object combining the chosen_subject and the grade_applied.
    """    
    subject_and_grade = chosen_subject, grade_applied
    print('Grade_for_subject: ', subject_and_grade)
    return subject_and_grade

graded_subject = grade_for_subject(chosen_subject, grade_applied)



def credits_for_graded_subject(chosen_subject, grade_applied):
    """Creates an object combining the graded_subject and credits_earned.
    """    
    subject_and_grade = chosen_subject, grade_applied
    print('Credits_for_graded_subject: ', subject_and_grade)
    return subject_and_grade
subject_with_credits = credits_for_graded_subject(chosen_subject, grade_applied)



def extract_credit_value(chosen_subject):
    """The credit value is extracted from the chosen_subject object so that it may be calculated into the GPA.
    """    
    index = len(chosen_subject)
    the_credit = int(chosen_subject[index-1])
    print("The credit value of this course, for GPA purposes is: ", the_credit)
    return the_credit

credit_value = extract_credit_value(chosen_subject)

# As a student, I want to access my records and see an accurate calculated GPA score based on my recorded grades.
# function accumulate_credits(grade_points_earned)
    # if grade_points_earned > 0
    # return credits_received += course_credits
    # else:
    # return credits_received

#only choose each course once









