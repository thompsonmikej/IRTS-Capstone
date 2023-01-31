import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const ScheduledCoursesPage = () => {

    const [user, token] = useAuth();
    const [courses, setCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const [deleteCourses, setDeleteCourses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/get_scheduled_courses/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setCourses(response.data);
            } catch (error) {
                console.log('Error in courses', error);
            }
        };
        fetchCourses();
    }, [token]);

    const selectCourse = async (courseId) => {
        let courseObject = {
            "course_id": courseId,
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/post_student_into_courses/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            setApplyCourse(response.data.items)
            navigate(`/course_schedule/`)
        } catch (error) {
            console.log('error in course_schedule, courseId', error.response.data)
        }

    }

    const selectDeleteCourses = async (courseId) => {
        let courseObject = {
            "course_id": courseId,
        }
        { console.log('courseId', courseId) }
        try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/student_courses/disenrolls_course/${courseId}/`,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    data: {
                        source: courseId
                    }
                });
            console.log('disenroll', courseId)
            setDeleteCourses(response.data)
            navigate(`/course_transcript/`)
        } catch (error) {
            console.log('error in disenroll', error)
        }

    };
    
    return (
        <><h1>Your Course Schedule, <br />{user.first_name} {user.last_name}, ID# {user.id}</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>COURSES ENROLLED: <Link to={`#`} className="dummy">TBD</Link> </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER:<Link to={`#`} className="dummy">TBD</Link></h2>
            <h2><Link to={`/courses_available/`}>View Available Courses</Link></h2>
            <h2><Link to="/course_transcript">View Transcript</Link></h2>
            <br /><><><div>
                {courses.map((course) => (
                    <div key={course.id} className="container">
                        <hr />
                        <span className="schedule-button">
                            <button type='submit' onClick={() => selectDeleteCourses(course.id)}>Disenroll</button>
                        </span>
                        <span><Link to={`#`} className="dummy">| {course.course.name} |</Link>DAYS: M, T, W | CR VALUE: {course.course.credit_value} | LOC: ONLN | AUG - DEC</span>

                    </div>
                ))}
            </div><div className="page-bottom"></div>
            </></></>
    );
};

export default ScheduledCoursesPage;

