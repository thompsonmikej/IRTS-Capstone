import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import axios from 'axios';

//12072022 EE adds a course into catalog

let initialValues = {
  name: "",
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
      navigate(`/available/`);
      console.log('add courses create ')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container">
      <h1>Create New Course</h1>
      <h2><Link to="/directory">Back to Employee Portal</Link></h2><hr />
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Course:{" 3 digit, 7 character"}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Credit Value:{" 1 digit, 0-4"}
          <input
            type="text"
            name="credit_value"
            value={formData.credit_value}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Semester: {"1 digit, 7 or 8"}
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Instructor: {""}
          <input
            type="text"
            name=""
            // value={formData.semester}
            // onChange={handleInputChange}
          />
        </label>
        <label>
          Location: {""}
          <input
            type="text"
            name=""
            // value={formData.semester}
            // onChange={handleInputChange}
          />
        </label>
        <label>
          Course Description: {""}
          <input
            type="text"
            name=""
          // value={formData.semester}
          // onChange={handleInputChange}
          />
        </label>
        <button onClick={() => postNewCourses()}>Add to Catalog</button>
      </form><div className="page-bottom"></div>
    </div>
  );
};

export default AddCoursesPage;

