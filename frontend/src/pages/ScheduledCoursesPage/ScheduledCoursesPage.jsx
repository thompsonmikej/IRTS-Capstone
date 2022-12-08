import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ScheduledCoursesPage = () => {

    const [user, token] = useAuth();
    const [items, setItems] = useState([]);
    const [gpa, setGpa] = useState(0)
    const [credits, setCredits] = useState(0)
    const [semester, setCalcSemester] = useState(0)
    const [scheduledCourses, setScheduledCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/scheduled/`, {
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


    useEffect(() => {
        if (scheduledCourses.length > 0) {
            findGpa();
        }
    }, [scheduledCourses])

    function findGpa() {
        let sum = 0;
        for (let i = 0; i < scheduledCourses.length; i++) {
            console.log('ScheduledCourses[i]', scheduledCourses[i])
            sum += scheduledCourses[i].grade_received
        }
        let gpa = (sum / scheduledCourses.length);
        console.log('sum', sum);
        console.log('number of courses', scheduledCourses.length);
        console.log('setGpa', gpa);
        setGpa(gpa)
    }

    useEffect(() => {
        findCredits();
    }, [scheduledCourses])

    function findCredits() {
        let sumCredits = 0;
        for (let i = 0; i < scheduledCourses.length; i++) {
            console.log('ScheduledCourses[i]', scheduledCourses[i])
            sumCredits += scheduledCourses[i].credits_received
        }
        console.log('sum of credits', sumCredits);
        setCredits(sumCredits)
    }

    useEffect(() => {
        calcSemester();
    }, [scheduledCourses])


    function calcSemester() {
        let creditCountMultiple = (credits / 12)
        let currentSemester = (Math.ceil(creditCountMultiple + 7))//+ Courses.semester
        console.log('credit count', creditCountMultiple)
        console.log('calc semester', currentSemester)
        setCalcSemester(currentSemester)
    }

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
            navigate('/grades')
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }

    };
    return (
            <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1>
                <h2>BACHELOR DEGREE PROGRAM</h2>
                <h2>COURSES ENROLLED: TBD </h2>
                <h2>TOTAL CREDITS ATTEMPTED: TBD</h2> 
                <br /><><><div>
                    {items.map((item) => (
                        <div key={item.id} className="container">
                            <hr />

                            <span>{item.course.name} | </span>
                            <span>DAYS: M, T, W | </span>
                            <span>CR VALUE: {item.course.credit_value} |</span>
                            <span>LOC: Online | </span>
                            <span>AUG - NOV | </span>
                        <div className="schedule-button">
                            <button type='submit' onClick={() => fetchItems(item.course.id)}>Add Grades</button>
                        </div>
                    </div>
                
                ))}

                {console.log('Return in item', items)}
            </div>
        </></></>
    );
};

export default ScheduledCoursesPage;

