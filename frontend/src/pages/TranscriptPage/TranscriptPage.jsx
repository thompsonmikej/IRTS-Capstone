import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


//TranscriptPage
const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [gpa, setGpa] = useState(0)
    const [credits, setCredits] = useState(0)
    const [semester, setCalcSemester] = useState(0)
    const [calcGradReady, setCalcGradReady] = useState(0)

    
    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/1/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in StudentCourses', studentCourses)
                setStudentCourses(response.data);
            } catch (error) {
                console.log('Error in StudentCourses', error);
            }
        };
        fetchStudentCourses();
    }, [token]);

    useEffect(() => {
        if (studentCourses.length > 0) {
            findGpa();
        }
    }, [studentCourses])

    function findGpa() {
        let sum = 0;
        for (let i = 0; i < studentCourses.length; i++) {
            console.log('studentCourses[i]', studentCourses[i])
            sum += studentCourses[i].grade_received
        }
        let gpa = (sum / studentCourses.length);
        console.log('sum', sum); 
        console.log('number of courses', studentCourses.length); 
        console.log('setGpa', gpa); 
        setGpa(gpa)
    }

    useEffect(() => {   
            findCredits();
    }, [studentCourses])

    function findCredits() {
        let sumCredits = 0;
        for (let i = 0; i < studentCourses.length; i++) {
            console.log('studentCourses[i]', studentCourses[i])
            sumCredits += studentCourses[i].credits_received
        }
        console.log('sum of credits', sumCredits); 
        setCredits(sumCredits)
    }
    
    useEffect(() => {
        calcSemester();
    }, [studentCourses])

    //INCOMPLETE
    function calcSemester() {
        // Calculates current semester according to credits earned
        let creditCountMultiple = (credits / 12)
        let currentSemester = (Math.ceil(creditCountMultiple + 7))//+ Courses.semester
        // if (currentSemester >= 8) {
        //     currentSemester == 8
        // } Max the semester at 8
        console.log('credit count', creditCountMultiple)
        console.log('calc semester', currentSemester)
        setCalcSemester(currentSemester)
    }

    //FOR READY TO GRADUATE
    function CalcGradReady() {
        let calcGradReady;
        if (credits >= 12)
            if (gpa <= 3) {
            calcGradReady = "Ready to Graduate";    
        } else {
            calcGradReady = "";    
        }
        console.log("grad_ready", calcGradReady);
        setCalcGradReady(calcGradReady)
    }

    return (
        <><h2>Transcript of All Courses for Student<br /> GPA: {gpa}; CR EARNED: {credits}; CURRENT SEMESTER: {semester}</h2><br/><><><div>
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    STU ID# {studentCourse.user.id}, {studentCourse.user.first_name} {studentCourse.user.last_name}, SEM {studentCourse.course.semester},   {studentCourse.course.name}, GRADE EARNED: {studentCourse.grade_received},  COURSE CR: {studentCourse.course.credit_value},    CR EARNED: {studentCourse.credits_received} 
                    </p>
                    ))}
            
            {console.log('studentCourse return', studentCourses)}
            
        </div>
        </></></>

    );
};

export default TranscriptPage;


