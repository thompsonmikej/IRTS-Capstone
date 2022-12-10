import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./StudentLoginPage.css";

const StudentLoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <><h1>Welcome to the Student Portal!</h1>
      <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange} />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange} />
        </label>
        {isServerError ? (
          <p className="error">Incorrect credentials.<br />Please try again.</p>
        ) : null}
        {/* <Link to="/register" className="register">Register here</Link> */}
          <button type='submit' onClick={() => navigate('/scheduled')}>Login</button>
      </form>
    </div></>
  );
};

export default StudentLoginPage;


// If the person registered as EE, then loginPage should request the name of the student and display view Graduates