import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

//TranscriptPage
const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);

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
    return (
        <><h2>Transcript of All Courses for Student</h2><br/><><><div>
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    STU ID# {studentCourse.user.id}, {studentCourse.user.first_name} {studentCourse.user.last_name}, SEM {studentCourse.course.semester},   {studentCourse.course.name}, GRADE RECEIVED: {studentCourse.grade_received},  COURSE CR: {studentCourse.course.credit_value},    CR RECEIVED: {studentCourse.credits_received} 
                    </p>
                    ))}
            
            {console.log('Return in studentCourse', studentCourses)}
        </div>
        </></></>
    );
};

export default TranscriptPage;


