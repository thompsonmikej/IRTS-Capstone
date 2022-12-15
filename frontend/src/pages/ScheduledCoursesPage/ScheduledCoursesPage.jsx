import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const ScheduledCoursesPage = () => {

    const [user, token] = useAuth();
    console.log('user on scheduledCourses', user)
    const [courses, setCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCourses = async () => {

            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/enroll_student/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in AvailableCourses', courses)
                setCourses(response.data);
            } catch (error) {
                console.log('Error in AvailableCourses', error);
            }
        };
        fetchCourses();
    }, [token]);

    const selectCourse = async (courseId) => {
        let courseObject = {
            "course_id": courseId,
        }
        console.log('courseObject', courseObject)
        try {
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
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1>
                <h2>BACHELOR'S DEGREE PROGRAM</h2>
                <h2>COURSES ENROLLED: TBD </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER: TBD</h2>
            <h2><Link to="/transcript">View Transcript</Link></h2><hr />
                <br /><><><div>
                    {courses.map((course) => (
                        <div key={course.id} className="container">
                            <hr />
                            <span><Link to={`/scheduled/`} className="dummy">{course.course.name} |</Link> </span>
                            <span>DAYS: M, T, W | </span>
                            <span>CR VALUE: {course.course.credit_value} |</span>
                            <span>LOC: ONLN | </span>
                            <span>AUG - DEC | </span>
                            <span>GRADE: TBD </span>
                    </div>
                  ))}
                {console.log('Return in item', courses)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default ScheduledCoursesPage;

