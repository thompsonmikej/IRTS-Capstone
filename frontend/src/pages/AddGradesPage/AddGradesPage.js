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

const AddGradesPage = (props) => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrade);

  async function postNewGrade() {

    let modifiedGrade = formData;
    //if/else to check current letter value of modifiedGrade.grade_received and reassign a number to the property AND assign the appropriate credit value
    console.log('modifiedgrade', modifiedGrade)

    try {
      let response = await axios.post(`http://127.0.0.1:8000/api/grades/create/`, modifiedGrade, {
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
      <h1>Add Grade for {user.first_name}, student Id#{user.id}</h1>
      <h2>COURSE TITLE</h2>
      <h2>CREDIT VALUE</h2>
      <h2>AUG - NOV </h2><hr/><br />
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Enter a Grade: {"A, B, C, or D "}
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

export default AddGradesPage;

