def calculate_semester_by_credits(sum_of_credits):
    if(sum_of_credits <=12):
        return 7
    elif(sum_of_credits > 13 and sum_of_credits <=24):
        return 8
semester_by_credits = calculate_semester_by_credits(8)