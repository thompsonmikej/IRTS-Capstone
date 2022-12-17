import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";


const GradeStudentPage = () => {

    const [user, token] = useAuth();
    const [course, setCourse] = useState([]);
    const [student, setStudent] = useState([]);
    const { studentId } = useParams();
    const navigate = useNavigate();
    
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

    return (
        <><h1>Enter Student Grade by Course</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <br /><><><div>
                    {student.map((course) => (
                        <div key={course.id} className="container">
                            {console.log('success in fetch student', course)}
                           <hr />
                            <span className="schedule-button">
                                <button type='submit' className="dummy">Add Grade</button>
                            </span>
                            <span>| {student[0].user.first_name} {student[0].user.last_name} |</span>
                            <span><Link to={`#`} className="dummy">{course.course.name} |</Link></span>
                            <span>GRADE: {course.grade_received} |</span>
                            <span><Link to={`#`} className="dummy">INSTR: SMITH |</Link></span>
                    </div>
                  ))}
            </div><hr/><h2><Link to="#" className="dummy">Back to Top</Link></h2><div className="page-bottom"></div>
        </></></>
    );
};

export default GradeStudentPage;

