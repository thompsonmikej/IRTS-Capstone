import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const AvailableCourses = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();
    const [semester, setSemester] = useState(0);

        useEffect(() => {
        const fetchItems = async () => {
            
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/enroll_student/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in AvailableCourses', items)
                setItems(response.data);
            } catch (error) {
                console.log('Error in AvailableCourses', error);
            }
        };
        fetchItems();
    }, [token]);

    useEffect(() => {
        const fetchSemester = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_semester/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response Fetch semester in AvailableCourses', semester)
                setSemester(response.data);
            } catch (error) {
                console.log('Error in fetch semester', error);
            }
        };
        fetchSemester();
    }, [])

    
    const selectCourse = async(courseId) => {
        let courseObject = {
            "course_id": courseId,
        }
        console.log('courseObject', courseObject)
        try {
            console.log('courseObject', courseObject)
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/register_new_course/`,
                courseObject,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            
            console.log('success in courseId: ', courseId)
            setApplyCourse(response.data.items)
            navigate(`/scheduled/${user.id}/`)
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }
 
    };
    return (
        <><h1>Courses Available to {user.first_name} {user.last_name}</h1><><>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>24 CREDITS TOTAL REQUIRED TO GRADUATE</h2>
            <h2><Link to={`/scheduled/${user.id}/`}>View Scheduled Courses</Link></h2>
            <br />   
            <div>
            {   items.map((item) => (
                <><div key={item.id} className="container">
                    <hr />  
               
                    <span><Link to={`/scheduled/${user.id}/`} className="dummy">{item.course.name} |</Link></span>
                    <span>CR VALUE: {item.course.credit_value} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>INSTR: X | </span>
                    <span>LOC: ONLN | </span>
                    <span className="schedule-button">
                        <button type='submit' onClick={() => selectCourse(item.id)}>Enroll Student</button>
                    </span>
                  </div>
                </>
                    ))}
            
            {console.log('Return in AvailableCourses', items)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default AvailableCourses;
