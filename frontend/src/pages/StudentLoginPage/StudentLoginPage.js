import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./StudentLoginPage.css";

const StudentLoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, isServerError, user } = useContext(AuthContext);
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
      <div className="stu-pic"><img src="https://img.freepik.com/free-photo/portrait-smiling-african-american-male-college-student-walking-with-coffee-isolated-white-wall_231208-638.jpg?w=740&t=st=1670117811~exp=1670118411~hmac=c8e92f3fe7101ca46fa69017402a1f51c691d6d6bff23e98701e80bf4bd97045" alt="student" /><img src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg" alt="student" />
      </div>
      <div className="schedule-button"></div>
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
      
          <button type='submit' onClick={() => navigate(`/scheduled/${user.id}/`)}>Login</button>
      </form>
        <div className="page-bottom"></div></div></>
  );
};

export default StudentLoginPage;


// If the person registered as EE, then loginPage should request the name of the student and display view Graduates