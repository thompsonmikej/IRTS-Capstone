import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const ScheduledCoursesPage = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);
    const [gpa, setGpa] = useState(0)
    const [credits, setCredits] = useState(0)
    const [semester, setCalcSemester] = useState(0)
    const [scheduledCourses, setScheduledCourses] = useState([]);
    const navigate = useNavigate();
    const { studentId } = useParams()
    //Then able to get all studentcourses for that student

    useEffect(() => {
        const fetchItems = async (props) => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/scheduled/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in ScheduledCourses', items)
                setItems(response.data);
            } catch (error) {
                console.log('Error in ScheduledCoursesPage', error);
            }
        };
    fetchItems();
    }, [token]);

    const fetchItems = async (courseId) => {
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

            console.log('Success response in items', courseId)
            setItems(response.data.items)
            navigate("/grades/:studentId")
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }

    };
    return (
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1>
                <h2>BACHELOR'S DEGREE PROGRAM</h2>
                <h2>COURSES ENROLLED: TBD </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER: TBD</h2>
            <h2><Link to="/available">See Available Courses</Link></h2>
                <br /><><><div>
                    {items.map((item) => (
                        <div key={item.id} className="container">
                            <hr />
                            <span>{item.course.name} | </span>
                            <span>DAYS: M, T, W | </span>
                            <span>CR VALUE: {item.course.credit_value} |</span>
                            <span>LOC: ONLN | </span>
                            <span>AUG - NOV | </span>
                    </div>
                  ))}
                {console.log('Return in item', items)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default ScheduledCoursesPage;

