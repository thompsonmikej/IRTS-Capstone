import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

//TranscriptPage
const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    console.log('user', user);
    console.log('token', token);
    const [studentCourses, setStudentCourses] = useState([]);
    const [Gpa, setGpa] = useState(0);
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = useState(0);
        
    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/transcript/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in StudentCourses', studentCourses)
                setStudentCourses(response.data);
            } catch (error) {
                console.log('Error in StudentCourses', error);
            }
        };
        fetchStudentCourses();
    }, [token]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_credits/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response FetchCredits in StudentCourses', studentCourses)
                setCredits(response.data);
            } catch (error) {
                console.log('Error in fetch credits', error);
            }
        };
        fetchCredits();
    }, [])

    useEffect(() => {
        const fetchSemester = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_semester/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response Fetch semester in StudentCourses', studentCourses)
                setSemester(response.data);
            } catch (error) {
                console.log('Error in fetch semester', error);
            }
        };
        fetchSemester();
    }, [])

        
    useEffect(() => {
        const fetchGpa = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_gpa/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });               
                console.log('Success response FetchGpa in StudentCourses', studentCourses)
                setGpa(response.data);
            } catch (error) {
                console.log('Error in fetch Gpa', error);
            }
        };
        fetchGpa();
    }, [])

    return (
        <><h1>Transcript of Courses for {user.first_name} {user.last_name}</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>CREDITS EARNED: {credits}</h2>
            <h2>CURRENT SEMESTER: {semester}</h2>
            <h2>GPA: {Gpa}</h2>
            <h2><Link to={`/available/`}>View Available Courses</Link></h2>
            <hr />
            <br /><><><div className="container">
            {studentCourses.map((studentCourse) => (
                <p key={studentCourse.id}>
                    <span>{studentCourse.course.name} |</span>
                    <span>CR VALUE: {studentCourse.course.credit_value} |</span>
                    <span>GRADE: {studentCourse.grade_received} |</span>
                    <span>CR EARNED: {studentCourse.credits_received} |</span> 
                    <span>FALL 2022 |</span> 
                    <span><Link to="/transcript" className="dummy">CR REQUIREMENTS</Link></span> 
                    <hr/>
                    </p>
                    ))}
            
            {console.log('studentCourse return', studentCourses)}
            
            </div><div className="page-bottom"></div>
        </></></>

    );
};

export default TranscriptPage;


