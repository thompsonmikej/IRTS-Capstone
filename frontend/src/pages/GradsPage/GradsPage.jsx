//start with hello world	
//axios call in useEffect, console log response	
//then try to display info	

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
// export default class GradsPage extends React.Component	

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
                    {grads.first_name} {grads.last_name} {grads.semester}  {grads.gpa} {grads.credits_earned}
                    </p>
                    ))}
            
            {console.log('Return in Grad_ready', grads)}
        </div>
        </></></>
    );
};

export default GradsPage;

