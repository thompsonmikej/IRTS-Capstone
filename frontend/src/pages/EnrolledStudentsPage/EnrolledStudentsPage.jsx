import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//EMPLOYEES ONLY
const EnrolledStudentsPage = () => {

    const [user, token] = useAuth();
    const [persons, setPersons] = useState([]);
    const [selectEnroll, setSelectEnroll] = useState([]);
    const [sendToGrades, setToGrades] = useState([]);
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


    const fetchSelectEnroll = async (seekId) => {
        let userId = seekId
        try {
            console.log('userId in select Enroll: ', userId)
            let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${userId}/`,
                 {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

            console.log('userId in select Enroll: ', userId)
            setSelectEnroll(response.persons)
            navigate(`/available/`);
        } catch (error) {
            console.log('error in select Enroll', error.message)
        }
    };

    const fetchToGrades = async (studentToGrade) => {
        let toStudentGrading = studentToGrade
        try {
            console.log('enrolled student object sent to Add Grades: ', toStudentGrading)
            let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${toStudentGrading}/`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            console.log('enrolled student object sent to Add Grades: ', toStudentGrading)
            setToGrades(response.persons)
            navigate(`/grades/`)
        } catch (error) {
            console.log('enrolled student object sent to Add Grades: ', error.message)
        }
    };

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
                            <span className="schedule-button">
                                <button type='submit' onClick={() => fetchSelectEnroll(person.id)}>Select, Enroll</button>
                              </span>
                            <span className="schedule-button">
                                <button type='submit' onClick={() => fetchToGrades(person.id)}>Add a Grade</button>
                            </span>
                            <span>| {person.first_name} {person.last_name} |</span>
                            <span>SEM: {person.semester} |</span>
                            <span>FULL TIME |</span>
                            <span><Link to="/enrolled" className="dummy">XFER CREDIT</Link></span>
                        </div>
                    </div>
                ))}

                {console.log('Return in Grad_ready', persons)}
            </div><div className="page-bottom"></div>
            </></></>
    );
};

export default EnrolledStudentsPage;


