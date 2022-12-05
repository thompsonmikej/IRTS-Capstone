import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

//ScheduledCoursesPage
const ScheduledCoursesPage = (props) => {

    const [user, token] = useAuth();
    const [scheduledCourses, setScheduledCourses] = useState([]);

    useEffect(() => {
        const fetchScheduledCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/scheduled/1/`, {
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

    // function selectCourse(courseId) {
    //     let navigate = navigate();
    //     const fetchCourse = async (courseId) => {
    //         try {
    //             let response = await axios.delete(`http://127.0.0.1:8000/api/student_courses/register_new_course/`);
    //             console.log('success in courseId: ', courseId)
    //             applyCourse(response.data.items)
    //             navigate('/scheduled')
    //         } catch (error) {
    //             console.log('error in courseId', error.response.data)
    //         }
    //     }
    // };

    // axios.delete(URL, {
    //     headers: {
    //         Authorization: authorizationToken
    //     },
    //     data: {
    //         source: source
    //     }
    // });


    return (
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1><br/><><><div>
            {scheduledCourses.map((scheduledCourse) => (
                <div key={scheduledCourse.id} className="container">
                    <hr/>
                    <span>{scheduledCourse.course.name} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>CREDIT VALUE: {scheduledCourse.course.credit_value} |</span>
                    <span>GRADE EARNED: TBD | </span>
                    <span>CREDITS EARNED: 0 </span>
                    <div>
                        <button type='submit' onClick={() => selectCourse(item.id)}>Delete from Schedule</button>
                        {/* Removes this line from the Scheduled (scheduled) Courses page  */}
                    </div> 
                    </div>
                    ))}
            
            {console.log('Return in scheduledCourse', scheduledCourses)}
        </div>
        </></></>
    );
};

export default ScheduledCoursesPage;


