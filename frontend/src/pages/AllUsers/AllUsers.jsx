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
            {   persons.map((person) => (
                    <p key={person.id}>
                    ID# {person.student.id}, {person.student.first_name} {person.student.last_name}, {person.course.year_semester} SEM,  {person.course.name}, GPA {person.student.gpa}, {person.student.credits_earned} CR ACCUM
                    </p>
                    ))}
            
            {console.log('Return in all_users', persons)}
        </div>
        </></></>
    );
};

export default AllUsers;


