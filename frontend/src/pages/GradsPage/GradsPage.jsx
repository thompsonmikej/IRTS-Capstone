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
        <><h1>Candidates for Graduation</h1>
            <h2>BACHELOR DEGREE PROGRAM</h2>
            <h2>24 credits required to graduate</h2>
            <br /><><><div className="container">
            {   persons.map((person) => (
                <div key={person.id}>
                    <hr/>
                    <span>{person.first_name} {person.last_name} | </span>
                    <span>LAST SEM: {person.semester} | </span>
                    <span>GPA: {person.gpa} |</span>
                    <span>CR EARNED: {person.credits_earned} | </span>
                    <span>ADM DATE: AUG | </span>
                    <span>GRAD DATE: FEB </span>
                </div>
                      ))}
            
            {console.log('Return in Grad_ready', persons)}
        </div>
        </></></>
    );
};

export default GradsPage;


