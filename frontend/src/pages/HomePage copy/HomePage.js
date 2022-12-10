import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import './HomePage.css';
import axios from "axios";
import AddCoursesPage from "../AddCoursesPage/AddCoursesPage";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The; "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [student, setStudent] = useState([]);


  return (
    <div className="centered"> 
      <h1>Welcome!<br />Registration Services for {user.first_name} {user.last_name}, ID# S-10{user.id}</h1>
      <div className="stu-pic"><img src="https://img.freepik.com/free-photo/portrait-smiling-african-american-male-college-student-walking-with-coffee-isolated-white-wall_231208-638.jpg?w=740&t=st=1670117811~exp=1670118411~hmac=c8e92f3fe7101ca46fa69017402a1f51c691d6d6bff23e98701e80bf4bd97045" alt="student" />
      </div>

            <></>
    </div>
  );
};

export default HomePage;
