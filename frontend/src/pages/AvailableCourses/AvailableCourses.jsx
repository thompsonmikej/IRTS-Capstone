import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const AvailableCourses = (props) => {

    const [user, token] = useAuth();
    const [availableCourses, setAvailableCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();
    const [semester, setSemester] = useState(0);

    useEffect(() => {
        const fetchSemester = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_semester/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setSemester(response.data);
                { console.log(semester) }
            } catch (error) {
                console.log('Error in fetch semester', error);
            }
        };
        fetchSemester();
    }, [token]);

    useEffect(() => {
        const fetchAvailableCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/courses_available/${semester}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                { console.log(semester) }
                setAvailableCourses(response.data);
            } catch(error) {
                console.log('Error in AvailableCourses', error);
            }
        };
        fetchAvailableCourses();
    }, [token]);

    const selectCourse = async (courseId) => {
        let courseObject = {
            "user_id": user.id,
            "course_id": courseId,
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/enroll_student_into_courses/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            console.log('enroll', courseObject)
            setApplyCourse(response.data.items)
            navigate(`/course_schedule/`)
        } catch (error) {
            console.log('error in enroll', error.response.data)
        }

    };
    
    return (
        <><h1>Courses Available to You,<br />{user.first_name} {user.last_name}, ID# {user.id}</h1><><>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS TOTAL REQUIRED TO GRADUATE</h2>
            <h2><Link to={`/course_schedule/`}>View Scheduled Courses</Link></h2>
            <h2><Link to="/course_transcript">View Transcript</Link></h2>
            <br />
            <div>
                {availableCourses.map((course) => (
                    <><div key={course.id} className="container">
                        {console.log('course:', course)}
                        <hr />
                        <span className="schedule-button">
                            <button type='submit' onClick={() => selectCourse(course.id)}>Enroll</button>
                        </span>
                        <span><Link to={`#`} className="dummy">| {course.name} |</Link></span>
                        <span>CR VALUE: {course.credit_value} |</span>
                        <span><Link to={`#`} className="dummy">DAYS: M, T, W |</Link></span>
                        <span>INSTR: SMITH |</span>
                        <span>LOC: ONLN  </span>
                    </div>
                    </>
                ))}

            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default AvailableCourses;
