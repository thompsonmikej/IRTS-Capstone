import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";


// Employee enters a grade for student record

let initialValues = {
  user_id: "",
  course_id: "",
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
      let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/grade_this_studentcourse/`, formData, {
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
      {/* <h2><Link to={`/find_student_course/${studentId}`}>Back to Student Course Listing</Link></h2> */}
      <h2><Link to="/directory">Back to Employee Portal</Link></h2>
      <hr />
    </div><div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Student ID: {" "}
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
          <label>
            Enter Credit Value:{" "}
            <input
              type="text"
              name="credits_received"
              value={formData.credits_received}
              onChange={handleInputChange} />
          </label>             
          <br />

          <button type="submit">Submit Grade</button>
        </form>
      </div></>
  );
};

export default GradeCoursePage;

