import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './SelectedStudentPage.css';

const SelectedStudentPage = () => {
    const { gradeStudent } = useContext(AuthContext);
    const defaultValues = {
        grade_received: "",
    };
    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        defaultValues,
        gradeStudent
    );

    const [user, token] = useAuth();
    console.log('user on scheduledCourses', user)
    const [course, setCourse] = useState([]);
    const [student, setstudent] = useState([]);
    const { studentId } = useParams();
    console.log('studentId scheduledCourses', studentId)
    const [availableCourses, setAvailableCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();


    
    useEffect(() => {
        const fetchstudent = async (props) => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentId}/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                setstudent(response.data)
            } catch (error) {
                console.log('error in fetch student', error)
            }      
        }
        fetchstudent();
    }, [token]);

    const selectCourse = async (courseId) => {
        let courseObject = {
            "user_id": user.id,
            "course_id": courseId,
        }
        console.log('courseObject', courseObject)
        try {
            console.log('courseObject', courseObject)
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/add_student_to_course/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

            console.log('success in courseId: ', courseId)
            setApplyCourse(response.data.items)
            navigate(`/scheduled/`)
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }

    };

    return (
        <><h1>{user.first_name} {user.last_name}, Grade the Student</h1>
            {console.log('student', student[0])}
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <br /><><><div>
                    {student.map((course) => (
                       <div key={course.id} className="container">
                           <hr />
                            <span className="schedule-button">
                                <button type='submit' onClick={() => selectCourse(course.id)}>ADD GRADE</button>
                            </span>
                            <span><Link to={`#`} className="dummy">| {student[0].user.first_name} {student[0].user.last_name} |</Link></span>
                            <span><Link to={`#`} className="dummy">{course.course.name} |</Link></span>
                            <span>GRADE: {course.grade_received} | </span>
                            <span><Link to={`#`} className="dummy">INSTR: JONASSEN |</Link></span>
                    </div>
                  ))}
                {console.log('Courses', course)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default SelectedStudentPage;

