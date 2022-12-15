import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const StudentTargetPage = () => {

    const [user, token] = useAuth();
    console.log('user on scheduledCourses', user)
    const [courses, setCourses] = useState([]);
    const [student, setstudent] = useState([]);
    const { studentId } = useParams();
    console.log('studentId scheduledCourses', studentId)

    
    useEffect(() => {
        const fetchstudent = async (props) => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentId}/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });

                // console.log('userObject', studentId)
                // console.log('userObject', student)
                // console.log(response.data)
                setstudent(response.data)
            } catch (error) {
                console.log('error in fetch student', error)
            }      
        }
        fetchstudent();
    }, [token]);

    
    return (
        <><h1>Grades for Student, {student[0].user.first_name} {student[0].user.last_name}</h1>
                <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
                <br /><><><div>
                    {student.map((course) => (
                       <div key={course.id} className="container">
                           <hr />
                            <span><Link to={`#`} className="dummy">{course.course.name} |</Link> </span>
                            <span>GR RECEIVED: {course.grade_received} | </span>
                            <span><Link to={`#`} className="dummy">INSTR: JONASSEN |</Link> </span>
        
                    </div>
                  ))}
                {console.log('Courses', courses)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default StudentTargetPage;

