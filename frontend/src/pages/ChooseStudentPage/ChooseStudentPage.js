import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import axios from 'axios';


let initialValues = {
    user_id: '',
    course_id: '',
    grade_received: '',
    credits_received: '',
};

const ChooseStudentPage = async (props) => {

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues);
    // const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrade);
    const [grades, setGrades] = useState([]);
    const { studentId } = useParams();

    useEffect(() => {
        const fetchGrades = async (gradeSubmitted) => {
            let gradeObject = {
                "grade_received": gradeSubmitted,
            }
            try {
                let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/is_studentcourse/${studentId}/`, gradeObject, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                navigate('/transcript');
                setGrades(response.data.items)
            } catch (error) {
                console.log('error in set grades', error.response.data);
            }
        };
        fetchGrades();
    }, [token]);



    return (
        <div className="container">
            <h1>Add Grade for {user.first_name} {user.last_name}</h1>
            <h2>COURSE TITLE</h2>
            <h2>CREDIT VALUE</h2>
            <h2>AUG - DEC </h2><hr /><br />
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    ENTER A GRADE: {"A, B, C, or D "}
                    <input
                        type="text"
                        name="grade_received"
                        value={formData.grade_received}
                        onChange={handleInputChange}
                    />
                </label>

                <button onClick={handleSubmit}>Add Grade</button>
            </form>
        </div>
    );
};

export default ChooseStudentPage;