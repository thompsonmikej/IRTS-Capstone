import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./NavBar.css";

const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);  
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="navText brand">
          <Link to="/HomePage" className="navText">
            <b>Integrated Registration<br/>Tracking System</b>
          </Link> 
        </li>
        <li >
          <Link to="/login" className="navLink">
            <b>Employee<br />Login </b>
          </Link>
        </li>
        <li >
          <Link to="/transcript" className="navLink">
            <b>View<br />Transcript </b>
          </Link>
        </li>
        <li >
          <Link to={`/available/`} className="navLink">
            <b>Available<br />Courses</b>
          </Link>
        </li>
        <li >
          <Link to={`/scheduled/`} className="navLink">
            <b>Scheduled<br/>Courses </b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
          {/* user.is_student= false (EE) ? Directory : No (is student), Transcript */}
          {/* result = user.is_student ? restrict access : unrestrict access */}
          {/* user ? Yes, must log out : No, must log in */}
          {/* user.is_student= false (EE) ? Yes, must log out : No (is student), must log in */}
          {/* result = user.is_student= false (EE) ? require log in : no log in */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
