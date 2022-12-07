import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ScheduledCoursesPage = (props) => {

    const [user, token] = useAuth();
    const [scheduledCourses, setScheduledCourses] = useState([]);
    const [sumAttemptedCredits, setSumAttemptedCredits] = useState(0)
    // const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchScheduledCourses() {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/scheduled/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in ScheduledCourses', scheduledCourses)
                setScheduledCourses(response.data);
                
            } catch (error) {
                console.log('Error in ScheduledCourses', error);
            }
        };
        fetchScheduledCourses();
    }, [token]);

    useEffect(() => {
        attemptedCredits();
    }, [scheduledCourses])

    function attemptedCredits() {
        let sumAttemptedCredits = 0;
        for (let i = 0; i < scheduledCourses.length; i++) {
            console.log('scheduled Courses[i]', scheduledCourses[i])
            sumAttemptedCredits += scheduledCourses[i].credit_value
        }
        console.log('sum of attempted credits', sumAttemptedCredits);
        setSumAttemptedCredits(sumAttemptedCredits)
    }
    
    return (
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1>
            <h2>BACHELOR DEGREE PROGRAM</h2>
            <h2>COURSES ENROLLED: </h2>
            <h2>TOTAL CREDITS ATTEMPTED: {sumAttemptedCredits}</h2>
            <br /><><><div>
            {scheduledCourses.map((scheduledCourse) => (
                <div key={scheduledCourse.id} className="container">
                                        <hr />
                    <span>{scheduledCourse.course.name} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>CR VALUE: {scheduledCourse.course.credit_value} |</span>
                    {/* <span>INSTR: X | </span> */}
                    <span>LOC: Online | </span>
                    <span>AUG - NOV | </span>
                    {/* <div className="schedule-button">
                        <button type='submit' onClick={() => scheduledCourses(scheduledCourse.course.id)}>Add Grade</button>
                    </div>  */}
                    </div>
                    ))}
            
            {console.log('Return in scheduledCourse', scheduledCourses)}
        </div>
        </></></>
    );
};

export default ScheduledCoursesPage;
