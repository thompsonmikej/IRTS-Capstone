import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const StudentTargetPage = () => {

    const [user, token] = useAuth();
    console.log('user on scheduledCourses', user)
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const { studentObject } = useParams();
    // const [ studentObject, setStudentObject ] = useState();

    
    useEffect(() => {
        const fetchStudents = async () => {
            console.log('userObject', studentObject)
            console.log('student', students)
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentObject}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });

                console.log('userObject', studentObject)
                console.log('userObject', students)
                console.log(response.data)
                setStudents(response.data.items)
            } catch (error) {
                console.log('error in fetch student', error.response.data)
            }
            fetchStudents();
        }
    }, [token]);

    // useEffect(() => {
    //     if (isServerError) {
    //         reset();
    //     }
    // }, [isServerError]);
    
    return (
        <><h1>Student Target: {students.first_name} {students.last_name}</h1>
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
                {console.log('Courses', courses)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default StudentTargetPage;

