import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import useCustomForm from "../../hooks/useCustomForm";
import AuthContext from "../../context/AuthContext";
import './FindStudentPage.css';

const FindStudentPage = () => {

    const [user, token] = useAuth();
    const [course, setCourse] = useState([]);
    // const { loginUser } = useContext(AuthContext);
    const [student, setStudent] = useState([]);
    const { studentId, courseId } = useParams();
    // const { courseId } = useParams();
    const navigate = useNavigate();
    const defaultValues = { user_id: "userId", course_id: "", grade_received: "" };
    const [formData, handleInputChange, handleSubmit, ] = useCustomForm(
        defaultValues, postNewGrades
        // loginUser
        //reset
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
            navigate("/directory");
            console.log('post new Grade', formData)
        } catch (error) {
            console.log('post new grade', error.message);
        }
    };



    return (
        <><h1>Find Course to Grade</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <br />
            <><div className="container">
                    <form className="form horizontal-fields" onSubmit={handleSubmit}>
                         <div><label className="label-style">
                            Course ID:{" "}
                            <input className="input-reduced-width"
                                type="text"
                                name="course"
                                value={formData.course.id}
                            onChange={handleInputChange}
                        />
                        </label></div>
                        <div><label className="label-style">
                            Enter Grade:{" "}
                            <input className="input-reduced-width"
                                type="text"
                                name="grade_received"
                                value={formData.grade_received}
                                onChange={handleInputChange} />
                        </label></div><br />
                        <button type="submit">Grade</button>
                    </form>
                </div></>
            <br/><h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <hr />
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

export default FindStudentPage;

