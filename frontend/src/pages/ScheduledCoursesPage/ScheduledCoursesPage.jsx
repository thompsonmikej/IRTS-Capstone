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
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/add_student_to_course/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            setApplyCourse(response.data.items)
            navigate(`/scheduled/`)
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }

    };
    return (
        <><h1>Your Course Schedule, <br/>{user.first_name} {user.last_name}</h1>
                <h2>BACHELOR'S DEGREE PROGRAM</h2>
                <h2>COURSES ENROLLED: TBD </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER: TBD</h2>
            <h2><Link to={`/available/`}>View Available Courses</Link></h2>
            <h2><Link to="/transcript">View Transcript</Link></h2>
                <br /><><><div>
                    {courses.map((course) => (
                        <div key={course.id} className="container">
                            <hr />
                            <span><Link to={`#`} className="dummy">{course.course.name} |</Link> </span>
                            <span>DAYS: M, T, W |</span>
                            <span>CR VALUE: {course.course.credit_value} |</span>
                            <span>LOC: ONLN |</span>
                            <span>AUG - DEC |</span>
                            <span>GRADE: TBD </span>
                    </div>
                  ))}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default ScheduledCoursesPage;

