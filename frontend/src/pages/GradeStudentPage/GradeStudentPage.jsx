import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import useCustomForm from "../../hooks/useCustomForm";
import AuthContext from "../../context/AuthContext";
import './GradeStudentPage.css'

const GradeStudentPage = () => {

    const [user, token] = useAuth();
    const [course, setCourse] = useState([]);
    // const { loginUser } = useContext(AuthContext);
    const [student, setStudent] = useState([]);
    const { studentId, courseId } = useParams();
    // const { courseId } = useParams();
    const navigate = useNavigate();
    const defaultValues = { user_id: "userId", course_id: "", grade_received: "" };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        defaultValues,
        // loginUser
    );
    
    useEffect(() => {
        const fetchStudent = async (props) => {
            { console.log('props pass in studentid', studentId) }
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentId}/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                console.log('success in fetch student', studentId)
                setStudent(response.data)
            } catch (error) {
                console.log('error in fetch student', error)
            }      
        }
        fetchStudent();
    }, [token]);

    const gradeCourse = async (courseId) => {
     console.log('courseId', courseId)
        let courseObject = {
            "user_id": user.id,
            "course_id": courseId,
            
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/grade_course_object/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

            setCourse(response.data)
                } catch (error) {
            console.log('error in courseId', error.response.data)
        }

    };

    return (
        <><h1>Find Student ID and Course to Grade</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <br />
            <h2><Link to={`/grade_course/${student.id}/`}>Ahead to Grade the Course</Link></h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
             <br /><><><div>
                    {student.map((course) => (
                        <div key={course.id} className="container">
                            {console.log('success in fetch student', course)}
                           <hr />                           
                            <span>STU ID: {student[0].user.id} |</span>
                            <span>{student[0].user.first_name} {student[0].user.last_name} |</span>                            <span>COURSE ID: {course.course.id} |</span>
                            <span><Link to={`#`} className="dummy">{course.course.name} |</Link></span>
                            <span>GRADE: {course.grade_received} |</span>
                            <span><Link to={`#`} className="dummy">INSTR: SMITH </Link></span>
                    </div>
                  ))}
            </div><hr/><h2><Link to="#" className="dummy">Back to Top</Link></h2><div className="page-bottom"></div>
        </></></>
    );
};

export default GradeStudentPage;

