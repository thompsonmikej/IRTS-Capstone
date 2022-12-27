import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './CourseCatalogPage.css';


const DeletedCoursePage = (props) => {

    const [user, token] = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const defaultValues = { user_id: "", course_id: "", name: "", credit_value: "", semester: "" };
    const [formData, handleInputChange, handleSubmit,] = useCustomForm(defaultValues, 
    );

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                console.log('Courses', fetchCourses)
                setCourses(response.data)
            } catch (error) {
                console.log('error in fetch Courses', error)
            }
        }
        fetchCourses();
    }, [token]);


    return (
        <><h1>Catalog of All Courses</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <br />
            <h2><Link to="/employee">Back to Employee Portal</Link></h2><br/><>
                <><div className="container">
                    {courses.map((course) => (
                        <p key={course.id}>
                            <hr />
                            <span>{course.id} |</span>
                            <span>{course.name} {course.credit_value} |</span>
                            <span>{course.course.name} |</span>
                
                        {/* <span>CR VALUE: {course.course.credit_value} </span> */}
                   
                    </p>
                ))}
            </div>
                <hr/><h2><Link to="#" className="dummy">Back to Top</Link></h2>
                <div className="page-bottom"></div>
            </></></>

    );
};

export default DeletedCoursePage;


