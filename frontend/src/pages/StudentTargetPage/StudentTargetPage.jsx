import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useParams } from 'react-router-dom';

const StudentTargetPage = () => {

    const [user, token] = useAuth();
    console.log('user on scheduledCourses', user)
    const [items, setItems] = useState([]);
    const [student, setStudent] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();
    const { studentObject } = useParams();
    // const [ studentObject, setStudentObject ] = useState();

    
    useEffect(() => {
        const fetchStudent = async () => {
            console.log('userObject', studentObject)
            console.log('student', student)
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentObject}`,

                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });

                console.log('userObject', studentObject)
                console.log('userObject', student)
                console.log(response.data)
                setStudent(response.data.items)
            } catch (error) {
                console.log('error in fetch student', error.response.data)
            }

            fetchStudent();
        }
    }, [token]);

    
    return (
        <><h1>Student Target: {student.first_name} {student.last_name}</h1>
                <h2>BACHELOR'S DEGREE PROGRAM</h2>
                <h2>COURSES ENROLLED: TBD </h2>
            <h2>CREDITS ATTEMPTED THIS SEMESTER: TBD</h2>
            <h2><Link to="/transcript">View Transcript</Link></h2><hr />
                <br /><><><div>
                    {items.map((item) => (
                        <div key={item.id} className="container">
                            <hr />
                            <span><Link to={`/scheduled/`} className="dummy">{item.course.name} |</Link> </span>
                            <span>DAYS: M, T, W | </span>
                            <span>CR VALUE: {item.course.credit_value} |</span>
                            <span>LOC: ONLN | </span>
                            <span>AUG - DEC | </span>
                            <span>GRADE: TBD </span>
                    </div>
                  ))}
                {console.log('Return in item', items)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default StudentTargetPage;

