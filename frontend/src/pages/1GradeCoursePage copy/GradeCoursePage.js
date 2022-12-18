import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useAuth";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";


// Employee enters a grade for student record

let initialValues = {
  user: "",
  course: "",
  grade_received: "",
  credits_received: "",
};

const GradeCoursePage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrades);

  async function postNewGrades() {
    try {
      let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/grade_course_object/5/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/directory");
      console.log('post new Grade', formData)
    } catch (error) {
      console.log(error.message);

    }
  }


  return (
    <><div><h1>Enter a Grade</h1></div><div>
      <h2>Enter the values from the Student Listing.</h2><br/>
      {/* <h2><Link to={`/grade_student/${studentId}`}>Back to Student Course Listing</Link></h2> */}
      <h2><Link to="/directory">Back to Employee Portal</Link></h2>
      <hr />
    </div><div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Student ID: {" "}
            <input
              type="text"
              name="user"
              value={formData.userId}
              onChange={handleInputChange} />
          </label>
          <label>
            Course ID:{" "}
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange} />
          </label>
          <label>
            Enter Grade:{" "}
            <input
              type="text"
              name="grade_received"
              value={formData.grade_received}
              onChange={handleInputChange} />
          </label><br/>

          <button type="submit" onClick={() => navigate('/directory')}>Submit Grade</button>
        </form>
      </div></>
  );
};

export default GradeCoursePage;

