import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const UngradedCourses = () => {

    const [user, token] = useAuth();
    const [UngradedCourses, setUngradedCourses] = useState([]);

    useEffect(() => {
        const fetchUngradedCourses = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/grades/get/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in UngradedCourses', UngradedCourses)
                setUngradedCourses(response.data);
            } catch (error) {
                console.log('Error in UngradedCourses', error);
            }
        };
        fetchUngradedCourses();
    }, [token]);
    return (
        <><h2>UngradedCourses</h2><><><div>
            {UngradedCourses.map((UngradedCourse) => (
                <p key={UngradedCourse.id}>
                    {UngradedCourse.user} {UngradedCourse.course} {UngradedCourse.grade_received}  {UngradedCourse.credits_received}
                    </p>
                    ))}
            
            {console.log('Return in UngradedCourses', UngradedCourses)}
        </div>
        </></></>
    );
};

export default UngradedCourses;


