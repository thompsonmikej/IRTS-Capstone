import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//EMPLOYEES ONLY
const EnrolledStudentsPage = () => {

    const [user, token] = useAuth();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/enrolled/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in all students', students)
                setStudents(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchStudents();
    }, [token]);

   
    return (
        <><h1>Enrolled Students</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>THIS SEMESTER: AUG 1 - DEC 31 </h2>
            <h2>NEXT SEMESTER: FEB 1 - MAY 31 </h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <br /><><><div className="container">
                {students.map((student) => (
                    <div key={student.id}>
                        <hr /><div>
                            {console.log('person', student)}
                            <span >
                                <Link to={`/student/${student.id}`}>ADD A GRADE</Link>
                            </span>
                            <span>| {student.first_name} {student.last_name} |</span>
                            <span>SEM: {student.semester} |</span>
                            <span>FULL TIME |</span>
                            <span><Link to="#" className="dummy">XFER CREDIT</Link></span>
                        </div>
                    </div>
                ))}

                {console.log('Return in Grad_ready', students)}
            </div><div className="page-bottom"></div>
            </></></>
    );
};

export default EnrolledStudentsPage;


