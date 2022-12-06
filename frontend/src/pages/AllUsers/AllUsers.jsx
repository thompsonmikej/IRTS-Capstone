import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/enrolled/`, {
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
        <><h1>Current Students</h1><><><div>
            {   persons.map((person) => (
                    <div key={person.id}>
                    <span> ID# {person.user.id}, {person.user.first_name} {person.user.last_name}</span>
                    {/* {person.course.year_semester} SEM,  {person.course.name}, GPA {person.student.gpa}, {person.student.credits_earned} CR ACCUM */}
                    <div className="schedule-button">
                        <button type='submit' onClick={() => selectStudent(item.id)}>Select</button>
                        {/* Removes this line from the Scheduled (scheduled) Courses page  */}
                    </div>    
                
                </div>
                    ))}
            
            {console.log('Return in all_users', persons)}
        </div>
        </></></>
    );
};

export default AllUsers;

//This page must require employee login

