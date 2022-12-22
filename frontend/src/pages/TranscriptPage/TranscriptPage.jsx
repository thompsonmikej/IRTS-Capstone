import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [Gpa, setGpa] = useState(0);
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = useState(0);

    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/get_transcript/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
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
                setCredits(response.data);
            } catch (error) {
                console.log('Error in fetch credits', error);
            }
        };
        fetchCredits();
    }, [])

    function readyToGraduate(credits, Gpa) {
        if (credits >= 128 && Gpa >= 3)
            return "Eligible for Bachelor's Degree"; //OR return 4 and send to DB
        else
            return "";// OR return 0 and send to DB
    }
    let ready = readyToGraduate(credits, Gpa);


    useEffect(() => {
        const fetchSemester = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/calculate_semester/${user.id}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
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
                setGpa(response.data);
            } catch (error) {
                console.log('Error in fetch Gpa', error);
            }
        };
        fetchGpa();
    }, [])


    function getGradeLetter(gradeNumber) {
        switch (gradeNumber) {
            case 4:
                return 'A';
            case 3:
                return 'B';
            case 2:
                return 'C';
            case 1:
                return 'F';
            default:
                return ' ';
        }
    }


    return (
        <><h1>Your Transcript of Courses, <br />{user.first_name} {user.last_name}, ID# {user.id}</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>CREDITS EARNED: {credits}</h2>
            <h2>CURRENT SEMESTER: {semester}</h2>
            <h2>GPA: {Gpa}</h2>
            <h2>{ready}</h2>
            <h2><Link to={`/courses_available/`}>View Available Courses</Link></h2>
            <h2><Link to={`/course_schedule/`}>View Scheduled Courses</Link></h2>
            <hr />
            <br /><><><div className="container">
                {studentCourses.map((studentCourse) => (
                    <p key={studentCourse.id}>
                        <span>{studentCourse.course.name} |</span>
                        <span>GRADE: {getGradeLetter(studentCourse.grade_received)} |</span>
                        <span>CR VALUE: {studentCourse.course.credit_value} |</span>
                        <span>CR EARNED: {studentCourse.credits_received} |</span>
                        <span>FALL 2022 |</span>
                        <span><Link to="#" className="dummy">CR REQUIREMENTS</Link></span>
                        <hr />
                    </p>
                ))}
            </div>
                <h2><Link to="#" className="dummy">Back to Top</Link></h2>
                <div className="page-bottom"></div>
            </></></>

    );
};

export default TranscriptPage;


