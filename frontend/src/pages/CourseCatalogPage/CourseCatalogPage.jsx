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


const CourseCatalogPage = (props) => {

    const [user, token] = useAuth();
    const [courses, setCourses] = useState([]);
    const [deleteCourses, setDeleteCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                setCourses(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchCourses();
    }, [token]);

    const selectDeleteCourses = async (courseId) => {
        let courseObject = {
            "course_id": courseId,
        }
        { console.log('courseId', courseId) }
        try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/courses/delete_courses/${courseId}/`,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    data: {
                        source: courseId
                    }
                });
            console.log('delete course', courseId)
            setDeleteCourses(response.data)
            navigate(`/employee/`)
        } catch (error) {
            console.log('error in delete course', error)
        }
    };


    return (
        <><h1>Catalog of Current Courses</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>THIS SEMESTER: AUG 1 - DEC 31 </h2>
            <h2>NEXT SEMESTER: FEB 1 - MAY 31 </h2><br />
            <h2><Link to="/employee">Back to Employee Portal</Link></h2>
            <><><div className="container">
                {courses.map((course) => (
                    <div key={course.id}>
                        <hr /><div>
                            <span className="schedule-button">
                                <button type='submit' onClick={() => selectDeleteCourses(course.id)}>Delete Course</button>
                            </span>
                            <span>| {course.name} |</span>
                            <span>SEMESTER: {course.semester} |</span>
                            <span>CREDITS: {course.credit_value}</span>
                        </div>
                    </div>
                ))}
            </div><hr /><h2><Link to="#" className="dummy">Back to Top</Link></h2><div className="page-bottom"></div>
            </></></>
    );
};

export default CourseCatalogPage;


