# User
# first_name
# last_name - charfield
# is_student - boolean = [True or False]
# year_semester - double = [7, 8]
# gpa - double #calcated below
# credits_earned - double  #calcated below
# grad_ready - boolean  = [True or False]

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


# def semester_seven()
# if credits_earned =>96 && credits_earned <110)
# return semester = 7

# def semester_eight()
# if credits_earned =>111 && credits_earned <124 
# return semester = 8

# def graduation_ready()
# if credits_earned => 124 && gpa =>3.0
# return grad_ready= True


# def calculate_GPA()
# gpa =
# courses_taken = []
# grades_accumulated / int(len(courses_taken))
# grades_accumulated += grade_received   # Adds current grade to the gpa
# https://stackoverflow.com/questions/9039961/finding-the-average-of-a-list 
# For Python 3.4+, use statistics.mean for numerical stability with floats. (Slower.)

# xs = [15, 18, 2, 36, 12, 78, 5, 6, 9]

# import statistics
# statistics.mean(xs)  # = 20.11111111111111



# def choose_grade():
#         grades = [A, B, C, D] 
       
#         selected_grade = grades[(int(input('''Choose the Grade : Grade Points 
#         A : 4 
#         B : 3 
#         C : 2 
#         D : 0 
#         '''))) - 1]
    
#         if grades == A or B or C or D:
#             return selected_grade
#         else:
#             self.choose_grade()
# grade_points_earned= choose_grade()



# As a student, I want to access my records and see an accurate calculated GPA score based on my recorded grades.
# function accumulate_credits(grade_points_earned)
    # if grade_points_earned > 0
    # return credits_received += course_credits
    # else:
    # return credits_received



#only choose each course once

# function by_semester() {
#   let select_semester = Number(prompt("Select the student's semester:\nFirst semester Senior (7), enter '1'\nLast semester Senior (8),));
#   if (select_semester >= 7 && select_semester < 8) {
#     for (let i = 1; i <= select_semester; i++) {
#       let userChoice = promptFor("Select the student's classes:\nThesis, Project, Business, Elective, chars).toLowerCase();
#       let foundMatches;
#       switch (userChoice) {
#         case "thesis":
#           # return case + select_semester + '01'
#           foundMatches = searchByGender(people);
#           displayPeople(foundMatches);
#           break;

#         case "project":
#           # return case + select_semester + '01'
#           foundMatches = searchByGender(people);
#           displayPeople(foundMatches);
#           break;

#         case "business":
#           # return case + select_semester + '01'
#           foundMatches = searchByGender(people);
#           displayPeople(foundMatches);
#           break;

#         case "elective":
#           # return case + select_semester + '01' 
#           foundMatches = searchByGender(people);
#           displayPeople(foundMatches);
#           break;
       
#           return;
#         default:
#           // Prompt user again. Another instance of recursion
#           return by_semester();
#       }
#     };
#   }
#   else
#     return by_semester();

# function searchByEyeColor(people) {
#   let inputColor = promptFor("Please enter the person's eye color: \nBlack, Blue, Brown, or Hazel", chars);
#   let foundMatches = people.filter(function (el) {
#     if (el.eyeColor.toLowerCase() === inputColor.toLowerCase()) {
#       return true;
#     }
#     else {
#       return false;
#     }
#   })
#   return foundMatches;




