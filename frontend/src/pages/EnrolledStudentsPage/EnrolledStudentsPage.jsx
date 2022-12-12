import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//EMPLOYEES ONLY
const EnrolledStudentsPage = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/enrolled/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in all students', persons)
                setPersons(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchPersons();
    }, [token]);
    return (
        <><h1>Enrolled Students</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>THIS SEMESTER: AUG 1 - DEC 31 </h2>
            <h2>NEXT SEMESTER: FEB 1 - MAY 31 </h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <br /><><><div className="container">
                {persons.map((person) => (
                    <div key={person.id}>
                        <hr /><div>
                            {console.log('person', person)}
                            <span><Link to={`/available/${person.semester}/`}>ENROLL IN COURSE |</Link></span>
                            <span><Link to="/grades">ADD GRADE |</Link></span>
                            <span>{person.first_name} {person.last_name} |</span>
                            <span>SEM: {person.semester} |</span>
                            <span>F-TIME |</span>
                            <span><Link to="/enrolled" className="dummy">TRANSFER CR</Link></span>
                        </div>
                    </div>
                ))}

                {console.log('Return in Grad_ready', persons)}
            </div><div className="page-bottom"></div>
            </></></>
    );
};

export default EnrolledStudentsPage;


