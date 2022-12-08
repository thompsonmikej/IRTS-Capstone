import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import axios from 'axios';

//12072022 EE adds a Grade to a student's course

let initialValues = {
  user_id :'',
  course_id: '',
  grade_received: '',
  credits_received: '',
};

const AddGradesPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrades);

  async function postNewGrades() {
    try {
      let response = await axios.post(`http://127.0.0.1:8000/api/grades/create/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate('/transcript');
      console.log('add Grades create ')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
  
    <div className="container">
      <h1>Grade received for {user.first_name}</h1>
      <form className="form" onSubmit={handleSubmit}>
{/*         
        <label>
          Course id:{""}
          <input
            type="integer"
            name="course id"
            value={formData.course_id}
            onChange={handleInputChange}
          />
        </label> */}
        <label>
          Enter a Grade: {"A, B, C, or D "}
          <input
            type="text"
            name="grade_received"
            value={formData.grade_received}
            onChange={handleInputChange}
          />
        </label>
        {/* <label>
          Credit Received: {"Should equal credit value "}
          <input
            type="text"
            name="credit_received"
            value={formData.credit_received}
            onChange={handleInputChange}
          />
        </label> */}
        <button onClick={() => postNewGrades()}>Add Grade</button>
      </form>
    </div>
  );
};

export default AddGradesPage;

