def choose_grade():
    """Returns a grade. Specify the course in another function--
    """
    grades = ['D', 'C', 'B', 'A']
    
    selected_grade = grades[(int(input('''Enter the letter grade that the student earned, A, B, C, D.
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

if grade_applied = 


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
