import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const GradsPage = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/auth/grads/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in Grad_ready', persons)
                setPersons(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchPersons();
    }, [token]);
    return (
        <><h2>Candidates for Graduation</h2><><><div>
            {   persons.map((person) => (
                    <p key={person.id}>
                    {person.first_name} {person.last_name}, {person.semester} SEM, GPA {person.gpa}, {person.credits_earned} CR ACCUM
                </p>
                // { grads.first_name } { grads.last_name }, SEM { grads.semester }, GPA { grads.gpa }, CR { grads.credits_earned } 
                    ))}
            
            {console.log('Return in Grad_ready', persons)}
        </div>
        </></></>
    );
};

export default GradsPage;


