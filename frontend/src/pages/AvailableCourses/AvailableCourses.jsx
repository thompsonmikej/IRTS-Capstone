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

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/current/`, {
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

    const selectCourse = async(courseId) => {
        let courseObject = {
            "course_id": courseId,
        }

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
            navigate('/scheduled')
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }
 
    };
    return (
        <><h1>Courses Available to {user.first_name}, student ID#{user.id}</h1><><>
            <h2>
                <Link to="/add_courses" className="register">Add Course to Catalog</Link>
            </h2>   
            <div>
            {   items.map((item) => (
                <><div key={item.id} className="container">
                    <hr />  
                    <span><Link to="/scheduled">{item.name} |</Link></span>
                    <span>CR VALUE: {item.credit_value} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>INSTR: X | </span>
                    <span>LOC: Online | </span>
                    <span className="schedule-button">
                        <button type='submit' onClick={() => selectCourse(item.id)}>Enroll Student</button>
                    </span>
                    {/* <Link to="/scheduled" onClick="selectCourse(item.id)">Enroll Student</Link> */}
                </div>
                </>
                    ))}
            
            {console.log('Return in AvailableCourses', items)}
        </div>
        </></></>
    );
};

export default AvailableCourses;
