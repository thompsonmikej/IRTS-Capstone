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


# def is_not_student()
    # is_student = False
    # year_semester = null
    # gpa = null
    # credits_earned = null
    # grad_ready = null


def semester(credits_earned, lower_number, upper_number):
    if credits_earned >= lower_number and credits_earned < upper_number:
        print('8')
    else:
        print('other')

determine_semester= semester(100, 111, 124)


def gradReady(gpa, credits_earned):
    lower_number = 3.0
    upper_number = 124
    if gpa >= lower_number and credits_earned >= upper_number:
        print('Eligible for graduation.')
    else:
        print('Not ready.')

ready_to_graduate = gradReady(3.1, 126)

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

def choose_your_semester(): 
    select_semester = int(input("Select the student's semester:\nSenior semester (7), enter '7'\nSenior semester (8), enter '8'\n"));
    if select_semester == 7:
        return(701)
    elif select_semester == 8:
        return (801)

select_semester = choose_your_semester()



def choose_grade():
        grades = ['D', 'C', 'B', 'A'] 
       
        selected_grade = grades[(int(input('''Choose the grade number 
        4 : A
        3 : B 
        2 : C 
        1 : D 
        ''')))-1]
    
        if grades == 1 or 2 or 3 or 4:
            print('letter grade on report ', selected_grade)
        else:
            print('entry rejected')
letter_grade= choose_grade()


def choose_grade_num():
        grades = [1, 2, 3, 4] 
       
        selected_grade = grades[(int(input('''Choose the grade number 
        4 : A
        3 : B 
        2 : C 
        1 : D 
        ''')))-1]
    
        if grades == 1 or 2 or 3 or 4:
            print('numeric grade on report ', selected_grade)
        else:
            print('entry rejected')

numeric_grade = choose_grade_num()


def award_course_credits(numeric_grade, credits_attempted):
    grade_points_earned = numeric_grade
    if grade_points_earned >= 2:
        return credits_attempted
    else:
        credits_attempted = 0
        return credits_attempted

credits_earned_per_course = award_course_credits(3.1, 4)


def calculate_credits_accumulated(credits_earned_per_course, previous_credits):
    credit_tally = int(credits_earned_per_course + previous_credits)
    print('Total credits accumulated: ', credit_tally)
 
course_credits_accumulated = calculate_credits_accumulated(
    credits_earned_per_course, 92)



def choose_your_semester(): 
    select_semester = int(input("Select for the student:\nSenior semester 7, enter '7'\nSenior semester 8, enter '8'\n"));
    if select_semester == 7:
        return(701)
    elif select_semester == 8:
        return (801)

select_semester = choose_your_semester()

#choose semester only once, choose each course once
# print to log.txt-- transcript

def choose_a_course(select_semester):
    cases = ['Thesis ', 'Project ', 'Business ', 'Elective ']
    three_credits = 3
    four_credits = 4
    user_choice = input(
        f'''Select the student's classes:\nThesis, credits: {four_credits}, enter '1' \nProject, credits: {four_credits}, enter '2' \nBusiness, credits: {three_credits}, enter '3' \nElective, credits: {three_credits}, enter '4' \n''').lower()
    match user_choice:
        case '1':
            print(cases[0], select_semester, ', credits: ', four_credits, ' was added to your schedule.')
            return(select_semester , cases[0] , four_credits)
        case '2':
            print(cases[1], select_semester, ', credits: ', four_credits, ' was added to your schedule.')
            return (select_semester, cases[1], four_credits)
        case '3':
            print(cases[2], select_semester, ', credits: ', three_credits, ' was added to your schedule.')
            return(select_semester , cases[2] , three_credits)
        case '4':
            print(cases[3], select_semester, ', credits: ', three_credits, ' was added to your schedule.')
            return(select_semester , cases[3] , three_credits)
        case _:
          # Prompt user again. Another instance of recursion
            return choose_a_course(select_semester)

chosen_course = choose_a_course(select_semester)


def extract_credit_value(chosen_course):
    """The credit value is extracted from this course object so that it may be calculated into the GPA.
    """    
    index = len(chosen_course)
    the_credit = int(chosen_course[index-1])
    print("The credit value is: ", the_credit)
    return the_credit

credit_value = extract_credit_value(chosen_course)

# As a student, I want to access my records and see an accurate calculated GPA score based on my recorded grades.
# function accumulate_credits(grade_points_earned)
    # if grade_points_earned > 0
    # return credits_received += course_credits
    # else:
    # return credits_received

#only choose each course once



# def user_or_employee(user_status, detemine_semester, gpa_calc, credits_accum , ready_to_graduate):
#     is_student = user_status
#     if is_student= True:
#         year_semester = detemine_semester
#         gpa = gpa_calc
#         credits_earned = credits_accum
#         grad_ready = ready_to_graduate
#     else:
#         year_semester = 'null'
#         gpa = 'null'
#         credits_earned = 'null'
#         grad_ready = 'null'

# account_status = user_or_employee(detemine_semester, gpa_calc, credits_accum, ready_to_graduate)







