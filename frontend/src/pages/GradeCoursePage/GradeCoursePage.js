import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrades);

  async function postNewGrades() {
    try {// grades
      let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/grade_course_object/5/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate('/');
      console.log('post new Grade')
    } catch (error) {
      console.log(error.message);

    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Student:{" "}
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Course:{" "}
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Enter Grade:{" "}
          <input
            type="text"
            name="grade_received"
            value={formData.grade_received}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Credit Value:{" "}
          <input
            type="text"
            name="credits_received"
            value={formData.credits_received}
            onChange={handleInputChange}
          />
        </label>

        <button>Submit Grade</button>
      </form>
    </div>
  );
};

export default GradeCoursePage;

