import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

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
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS MINIMUM AND 3.0 GPA REQUIRED</h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2><hr />
            <br /><><><div className="container">
            {   persons.map((person) => (
                <div key={person.id}>
                    <hr />
                    <span>{person.first_name} {person.last_name} | </span>
                    <span>LAST SEM: {person.semester} | </span>
                    <span>GPA: {person.gpa} |</span>
                    <span> <Link to="/grads" className="dummy">CR EARNED: {person.credits_earned} | </Link> </span>
                    <span>GRAD: FEB | </span>
                    <span>WITH HONORS </span>
                    <span> </span>
                </div>
                      ))}
            
            {console.log('Return in Grad_ready', persons)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default GradsPage;


