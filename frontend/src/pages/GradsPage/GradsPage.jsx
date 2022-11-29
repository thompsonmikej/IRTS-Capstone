import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const GradsPage = () => {

    const [user, token] = useAuth();
    const [grads, setGrads] = useState([]);

    useEffect(() => {
        const fetchGrads = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/auth/grads/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in Grad_ready', grads)
                setGrads(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchGrads();
    }, [token]);
    return (
        <><h2>Candidates for Graduation</h2><><><div>
            {   grads.map((grads) => (
                    <p key={grads.id}>
                    {grads.first_name} {grads.last_name}, {grads.semester} SEM, GPA {grads.gpa}, {grads.credits_earned} CR ACCUM
                </p>
                // { grads.first_name } { grads.last_name }, SEM { grads.semester }, GPA { grads.gpa }, CR { grads.credits_earned } 
                    ))}
            
            {console.log('Return in Grad_ready', grads)}
        </div>
        </></></>
    );
};

export default GradsPage;


