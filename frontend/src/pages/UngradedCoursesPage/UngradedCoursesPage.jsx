import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

//UngradedCoursesPage
const UngradedCoursesPage = (props) => {

    const [user, token] = useAuth();
    const [ungradedCourses, setUngradedCourses] = useState([]);

    useEffect(() => {
        const fetchUngradedCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/ungraded/1/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in UngradedCourses', ungradedCourses)
                setUngradedCourses(response.data);
            } catch (error) {
                console.log('Error in UngradedCourses', error);
            }
        };
        fetchUngradedCourses();
    }, [token]);

    // <span>GRADE EARNED: {ungradedCourse.grade_received} | </span>
    return (
        <><h1>Scheduled Courses for {user.first_name} {user.last_name}</h1><br/><><><div>
            {ungradedCourses.map((ungradedCourse) => (
                <div key={ungradedCourse.id} className="container">
                    <hr/>
                    <span>{ungradedCourse.course.name} | </span>
                    <span>DAYS: M, T, W | </span>
                    <span>CREDIT VALUE: {ungradedCourse.course.credit_value} |</span>
                    <span>GRADE EARNED: TBD | </span>
                    <span>CREDITS EARNED: 0 </span>
             
                    </div>
                    ))}
            
            {console.log('Return in ungradedCourse', ungradedCourses)}
        </div>
        </></></>
    );
};

export default UngradedCoursesPage;


