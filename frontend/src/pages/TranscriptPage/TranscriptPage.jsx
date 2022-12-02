import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

//TranscriptPage
const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [gpa, setGpa] = useState(0)

    
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
        let gpa = sum / studentCourses.length;
        console.log('sum', sum); //166
        console.log('number of courses', studentCourses.length); //4
        
        setGpa(gpa)
    }

    return (
        <><h2>Transcript of All Courses for Student; GPA: {gpa}</h2><br/><><><div>
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    STU ID# {studentCourse.user.id}, {studentCourse.user.first_name} {studentCourse.user.last_name}, SEM {studentCourse.course.semester},   {studentCourse.course.name}, GRADE RECEIVED: {studentCourse.grade_received},  COURSE CR: {studentCourse.course.credit_value},    CR RECEIVED: {studentCourse.credits_received} 
                    </p>
                    ))}
            
            {console.log('studentCourse return', studentCourses)}
            {/* {console.log('tempGpa return', tempGpa)} */}
        </div>
        </></></>

    );
};

export default TranscriptPage;


