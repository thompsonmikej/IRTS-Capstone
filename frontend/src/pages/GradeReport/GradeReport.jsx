import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const GradeReport = () => {

    const [user, token] = useAuth();
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/grades/get/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in get_grades', grades)   
                setGrades(response.data);
            } catch (error) {
                console.log('Error in get_grades', error);
            }
        };
        fetchGrades();
    }, [token]);
    return (
        <><h2>Grade Report</h2><><><div>
            {grades.map((grades) => (
                <p key={grades.id}>
                    {grades.student} {grades.course} {grades.grade_received}  {grades.credits_received}
                </p>
            ))}

            {console.log('Return in get_grades', grades)}
        </div>
        </></></>
    );
};

export default GradeReport;


