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
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/2/`, {
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
        <><h2>Transcript of all courses</h2><><><div>
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    ID# {studentCourse.user.id}, {studentCourse.user.first_name} {studentCourse.user.last_name} {studentCourse.course.semester} SEM,  {studentCourse.course.name}, CR VALUE {studentCourse.course.credit_value}, CR EARNED {studentCourse.course.credits_earned} 
                    </p>
                    ))}
            
            {console.log('Return in studentCourse', studentCourses)}
        </div>
        </></></>
    );
};

export default TranscriptPage;


