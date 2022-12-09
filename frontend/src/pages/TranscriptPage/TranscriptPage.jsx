import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

//TranscriptPage
const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [thisGpa, setThisGpa] = useState(0)
    const [credits, setCredits] = useState(0)
    const [semester, setCalcSemester] = useState(0)
    const [calcGradReady, setCalcGradReady] = useState(0)

    
    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/transcript/`, {
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
    }, [])

    function findGpa() {
        let gpaCalc = 0;
        for (let i = 0; i < studentCourses.length; i++) {
            console.log('studentCourses[i]', studentCourses[i])
            gpaCalc += studentCourses[i].grade_received
        }
        let thisGpa = (gpaCalc / studentCourses.length);
        console.log('sum', gpaCalc);
        console.log('number of courses', studentCourses.length);
        console.log('setGpa', thisGpa);
        setThisGpa(thisGpa)
        }
    
    const fetchGpa = async (thisGpa) => {
        console.log(' fetch thisGpa', thisGpa)
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/auth/post_gpa/${user.id}`, thisGpa, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            fetchGpa(response.data);
        } catch (error) {
            console.log('Error in StudentCourses', error);
        }
       
    };

    useEffect(() => {   
            findCredits();
    }, [studentCourses])
    
    function findCredits() {
        let sumCredits = 0;
        let thisLength = 0;
        for (let i = 0; i < studentCourses.length; i++) {
            console.log('studentCourses[i]', studentCourses[i])
            sumCredits += studentCourses[i].credits_received
            let thisLength = studentCourses.length
        }
        console.log('sum of credits', sumCredits); 
        console.log('length', thisLength); 
        setCredits(sumCredits)
    }
    
    useEffect(() => {
        calcSemester();
    }, [studentCourses])

  
    function calcSemester() {
        let creditCountMultiple = (credits / 12)
        let currentSemester = (Math.ceil(creditCountMultiple + 7))//+ Courses.semester
        console.log('credit count', creditCountMultiple)
        console.log('calc semester', currentSemester)
        console.log('credits', credits)
        setCalcSemester(currentSemester)
    }

    //FOR READY TO GRADUATE
    function CalcGradReady() {
        let calcGradReady;
        if (credits >= 12)
            if (thisGpa <= 3) {
            calcGradReady = "Ready to Graduate";    
        } else {
            calcGradReady = "";    
        }
        console.log("grad_ready", calcGradReady);
        setCalcGradReady(calcGradReady)
    }

    return (
        <><h1>Transcript of Courses for {user.first_name} {user.last_name}, student ID#{user.id}</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>CREDITS EARNED: {credits}</h2>
            <h2>CURRENT SEMESTER: {semester}</h2>
            <h2>GPA: {thisGpa}</h2>
            <hr />
            <br /><><><div className="container">
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    <span>{studentCourse.course.name} |</span>
                    <span>CR VALUE: {studentCourse.course.credit_value} |</span>
                    <span>GRADE: {studentCourse.grade_received} |</span>
                    <span>CR EARNED: {studentCourse.credits_received} |</span> 
                    <span>FALL 2022 |</span> 
                    <span><Link to="/transcript">COURSE REQUIREMENTS</Link></span> 
                    <hr/>
                    </p>
                    ))}
            
            {console.log('studentCourse return', studentCourses)}
            
        </div>
        </></></>

    );
};

export default TranscriptPage;


