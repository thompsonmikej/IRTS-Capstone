import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/users/all/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in all_users', persons)
                setPersons(response.data);
            } catch (error) {
                console.log('Error in all_users', error);
            }
        };
        fetchPersons();
    }, [token]);
    return (
        <><h2>Current Enrollment</h2><><><div>
            {   persons.map((persons) => (
                    <p key={persons.id}>
                    ID# {persons.student.id}, {persons.student.first_name} {persons.student.last_name}, {persons.course.year_semester} SEM,  {persons.course.name}, GPA {persons.student.gpa}, {persons.student.credits_earned} CR ACCUM
                    </p>
                    ))}
            
            {console.log('Return in all_users', persons)}
        </div>
        </></></>
    );
};

export default AllUsers;


