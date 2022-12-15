import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const AvailableCourses = (props) => {

    const [user, token] = useAuth();
    console.log('user on AvailableCourses', user)
    const [availableCourses, setAvailableCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();
    
    console.log('props on AvailableCourses', props)

        useEffect(() => {
        const fetchAvailableCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/get_available_courses/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in AvailableCourses', response.data)
                setAvailableCourses(response.data);
            } catch (error) {
                console.log('Error in AvailableCourses', error);
            }
        };
            fetchAvailableCourses();
    }, [token]);

    
    const selectCourse = async(courseId) => {
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
        <><h1>Courses Available to {user.first_name} {user.last_name}</h1><><>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS TOTAL REQUIRED TO GRADUATE</h2>
            <h2><Link to={`/scheduled/`}>View Scheduled Courses</Link></h2>
            <hr /><br />   
            <div>
            {   availableCourses.map((course) => (
                <><div key={course.id} className="container">
                    <hr />  
                    <span className="schedule-button">
                        <button type='submit' onClick={() => selectCourse(course.id)}>Enroll Student</button>
                    </span>               
                    <span><Link to={`/available/`} className="dummy">| {course.name} |</Link></span>
                    <span>CR VALUE: {course.credit_value} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>INSTR: X | </span>
                    <span>LOC: ONLINE  </span>
                  </div>
                </>
                    ))}
            
            {console.log('Return in AvailableCourses', availableCourses)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default AvailableCourses;
