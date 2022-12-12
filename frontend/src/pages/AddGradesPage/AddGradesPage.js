import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import axios from 'axios';


let initialValues = {
  user_id :'',
  course_id: '',
  grade_received: '',
  credits_received: '',
};

const AddGradesPage = async (props) => {

  const [user, token] = useAuth();
  const navigate = useNavigate();
  // const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues);
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewGrade);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async (gradeSubmitted) => {
      let gradeObject = {
        "grade_received": gradeSubmitted,
      }
      console.log('gradeObject', gradeObject)
      try {
        let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/grade_this_studentcourse/`, gradeObject, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        navigate('/transcript');
        console.log('add Grades create ', gradeObject)
        setGrades(response.data.items)
      } catch (error) {
        console.log('error in courseId', error.response.data);
      }
    };
    fetchGrades();
  }, [token]);

  async function postNewGrade(props) {
    let modifiedGrade = formData;

    if (modifiedGrade == "A") {
      console.log('A, 4', modifiedGrade)
      return "4";
    }
    else if (modifiedGrade == "B", modifiedGrade) {
      console.log('B, 3', modifiedGrade)
      return "3";
    }
    else if (modifiedGrade == "C", modifiedGrade) {
      console.log('C, 2', modifiedGrade)
      return "2";
    }
    else {
      console.log('else, 0', modifiedGrade)
      return "0";
    }
  }
  //   // postNewGrades();
  //   // }, []);
    
  return (  
    <div className="container">
      <h1>Add Grade for {user.first_name} {user.last_name}</h1>
      {console.log('user', user)}
      <h2>COURSE TITLE</h2>
      <h2>CREDIT VALUE</h2>
      <h2>AUG - DEC </h2><hr/><br />
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

export default AddGradesPage;