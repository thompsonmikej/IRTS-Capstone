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
    <><h1>Welcome to the Employee Portal</h1>
      <div className="stu-pic"><img src="https://img.freepik.com/free-photo/co-workers-giving-great-feedback_53876-13464.jpg?w=740&t=st=1670860211~exp=1670860811~hmac=57b21eb95dac1a0c0ad28d337d15c5435495265756b366a596c3f787c9f97a24" alt="student" />
      </div><br />
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange} />
        </label>
        {isServerError ? (
          <p className="error">Incorrect or incomplete credentials.<br />Please try again.</p>
        ) : null}
        <Link to="/register" className="register">New? Register here.</Link>
          <button type='submit' onClick={() => navigate('/directory')}>Login</button>
      </form>
    <div className="page-bottom"></div></div></>
  );
};

export default LoginPage;


// If the person registered as EE, then loginPage should request the name of the student and display view Graduates