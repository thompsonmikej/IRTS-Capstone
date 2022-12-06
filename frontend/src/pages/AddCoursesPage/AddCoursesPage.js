import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useAuth";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";


// Employee create a course for catalog

let initialValues = {
    name:"",
    credit_value: "",
    semester: "",
};

const AddCoursesPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewCourses);
 
async function postNewCourses() {
  try {
    let response = await axios.post(`http://127.0.0.1:8000/api/courses/create/`, formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }); 
    navigate('/');
    console.log('post new Course')
  } catch (error) {
    console.log(error.message);
    
  }
}

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="credit_value"
            value={formData.credit_value}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username:{" "}
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
          />
        </label>
         <button>Add Course</button>
      </form>
    </div>
  );
};

export default AddCoursesPage;

