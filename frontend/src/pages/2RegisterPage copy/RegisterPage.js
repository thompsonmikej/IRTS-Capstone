import React, { useContext } from "react";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from 'react';
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// THIS IS THE GRADE ENTRY DRAFT
const RegisterPage = () => {

  const [user, token] = useAuth();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { gradeStudent } = useContext(AuthContext);
  const defaultValues = {
    user_id: '',
    course_id: '',
    grade_received: '',
    // credits_received: '',
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    gradeStudent
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/auth/enrolled/`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.log('Error in Grad_ready', error);
      }
    };
    fetchStudents();
  }, [token]);


  return (
    <><><h1>Grade a Student</h1>
      <h2><Link to="/directory">Back to Employee Portal</Link></h2>
      <hr />
      <div className="container">
        {console.log('user', user)}
        {/* {console.log('course', courses)} */}
        {/* {console.log('student course', studentCourses)} */}
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Student ID:{" "}
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange} />
          </label>
          <label>
            Course ID:{" "}
            <input
              type="text"
              name="course_id"
              value={formData.course_id}
              onChange={handleInputChange} />
          </label>
          <label>
            Enter Grade:{" "}
            <input
              type="text"
              name="grade_received"
              value={formData.grade_received}
              onChange={handleInputChange} />
          </label>
          <button>Grade</button>
        </form>    <div className="page-bottom"></div>
      </div></><><div className="container">
        {/* {studentCourses.map((studentCourse) => (
          <p key={studentCourse.id}>
            <hr />
            {console.log('studentCourse', studentCourse)} */}
        {students.map((student) => (
          <p key={student.id}>
            <hr />
            {console.log('studentCourse', student)}
            {console.log('user', user)}
            {/* {console.log('formData', formData)} */}
            {/* {console.log('student id', studentId)} */}
            <span>CR VALUE: {student.id} |</span>
            {/* <span>{student.course.name} |</span>
            <span>CR VALUE: {student.course.credit_value} |</span>
            <span>GRADE: {student.grade_received} |</span> */}
            <span><Link to="#" className="dummy">CR REQUIREMENTS</Link></span>
          </p>
        ))}
      </div>
        <h2><Link to="#" className="dummy">Back to Top</Link></h2>
        <div className="page-bottom"></div>
      </></>

  );
};

export default RegisterPage;
