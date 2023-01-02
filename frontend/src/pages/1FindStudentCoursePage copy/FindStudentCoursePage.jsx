import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './FindStudentCoursePage.css';


const FindStudentCoursePage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [student, setStudent] = useState([]);
    const { studentId, courseId } = useParams();
    const { studentGrades } = useContext(AuthContext);
    const navigate = useNavigate();
    const defaultValues = { user_id: "", course_id: "", grade_received: "" };
    const [formData, handleInputChange, handleSubmit,] = useCustomForm(defaultValues, studentGrades, postNewGrades
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


    async function postNewGrades() {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/student_courses/grade_course_object/`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log('post new Grade', formData)
        } catch (error) {
            console.log('post new grade', error.message);
        }
    };

    function getGradeLetter(gradeNumber) {
        switch (gradeNumber) {
            case 4:
                return 'A';
            case 3:
                return 'B';
            case 2:
                return 'C';
            case 1:
                return 'F';
            default:
                return ' ';
        }
    }

    return (
        <><h1>Find Student's Course to Grade</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <br />
            <h2><Link to="/employee">Back to Employee Portal</Link></h2><>
                <h2><Link to="/candidates" className="register"> Candidates for Graduation </Link></h2><br/>
                <><div className="container">
                    {student.map((course) => (
                        <p key={course.id}>
                            <hr />
                            <span>STU ID: {student[0].user.id} |</span>
                            <span>{student[0].user.first_name} {student[0].user.last_name} |</span>
                            <span>{course.course.name} |</span>
                            <span><Link to={`/grade_course/${studentId}`}>GRADE, COURSE ID: {course.id} |</Link></span>
                            <span>GRADE: {getGradeLetter(course.grade_received)} </span>
                            <span>CR VALUE: {course.course.credit_value} </span>
                        </p>
                    ))}
                </div>
                    <hr /><h2><Link to="#" className="dummy">Back to Top</Link></h2>
                    <div className="page-bottom"></div>
                </></></>

    );
};

export default FindStudentCoursePage;


