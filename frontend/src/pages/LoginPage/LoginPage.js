import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
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
    <><h1>Welcome to the Employee Portal</h1><br/>
      <hr/>
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
        <Link to="/register" className="register">New? Register here.</Link>
          <button type='submit' onClick={() => navigate('/directory')}>Login</button>
      </form>
    <div className="page-bottom"></div></div></>
  );
};

export default LoginPage;


// If the person registered as EE, then loginPage should request the name of the student and display view Graduates