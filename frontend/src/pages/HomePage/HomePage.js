import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import axios from "axios";
import AddCoursesPage from "../AddCoursesPage/AddCoursesPage";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The; "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);


  return (
    <div className="centered"> 
      <h1>Welcome to the Registration Services<br/> of MJT College!</h1>
      <div className="stu-pic"><img src="https://img.freepik.com/free-photo/portrait-smiling-african-american-male-college-student-walking-with-coffee-isolated-white-wall_231208-638.jpg?w=740&t=st=1670117811~exp=1670118411~hmac=c8e92f3fe7101ca46fa69017402a1f51c691d6d6bff23e98701e80bf4bd97045" alt="student" /><img src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg" alt="student" />
      </div>
      <div className="schedule-button">
        <button type='submit' onClick={() => navigate('/studentLogin')}>Student Login</button>
      </div>
            <></>
    </div>
  );
};

export default HomePage;
