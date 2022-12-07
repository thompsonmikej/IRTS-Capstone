import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ScheduledCoursesPage = (props) => {

    const [user, token] = useAuth();
    const [scheduledCourses, setScheduledCourses] = useState([]);

    useEffect(() => {
        async function fetchScheduledCourses(courseId) {
            try {
                let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/scheduled/`, formData, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                navigate('/scheduled');
                console.log('Success response in ScheduledCourses', scheduledCourses)
                setScheduledCourses(response.data.items);
            } catch (error) {
                console.log('Error in ScheduledCourses', error);
            }
        };
        fetchScheduledCourses();
    }, [token]);
    
    return (
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1><br/><><><div>
            {scheduledCourses.map((scheduledCourse) => (
                <div key={scheduledCourse.id} className="container">
                    <hr/>
                    <span>{scheduledCourse.course.name} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>CR VALUE: {scheduledCourse.course.credit_value} |</span>
                    <span>GRADE: TBD | </span>
                    <span>CR EARNED: 0 </span>
                    {/* <div className="schedule-button">
                        <button type='submit'  onClick={() => selectCourse(item.id)}>Delete</button>
                        {/* Removes this line from the Scheduled (scheduled) Courses page  */}
                    </div>  */}
                    </div>
                    ))}
            
            {console.log('Return in scheduledCourse', scheduledCourses)}
        </div>
        </></></>
    );
};

export default ScheduledCoursesPage;


