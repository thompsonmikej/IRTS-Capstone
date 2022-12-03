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
    return (
        <><h2>Ungraded Courses for Student</h2><br/><><><div>
            {ungradedCourses.map((ungradedCourse) => (
                <p key={ungradedCourse.id}>
                    STU ID# {ungradedCourse.user.id}, {ungradedCourse.user.first_name} {ungradedCourse.user.last_name}, SEM {ungradedCourse.course.semester},   {ungradedCourse.course.name}, GRADE EARNED: {ungradedCourse.grade_received},  CR ATTEMPTED: {ungradedCourse.course.credit_value}
                    </p>
                    ))}
            
            {console.log('Return in ungradedCourse', ungradedCourses)}
        </div>
        </></></>
    );
};

export default UngradedCoursesPage;


