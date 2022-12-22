def readyToGraduate(credits, Gpa): 
    if (credits >= 128 and Gpa >= 3):
        print("4, grad_ready")
    else:
        print("0, not grad_ready")

readyToGraduate(127, 3)