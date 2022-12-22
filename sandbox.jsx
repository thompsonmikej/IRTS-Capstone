function readyToGraduate(credits, Gpa) {
    if (credits >= 136 && Gpa >= 3)
        return 4;
    else
        return 0;
}
        
readyToGraduate(136, 3.2)