import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="navText brand">
          {/* <Link to="/" className="navText">
            <b>Integrated Registration Tracking System</b>
          </Link> */}
          {/* {user ? (
            <button onClick={() => navigate("/login")}><b>Integrated Registration Tracking System <br />* Student *</b></button>
          ) : (
            <button onClick={() => navigate("/loginEE")}><b>Integrated Registration Tracking System <br />* Employee *</b></button>
          )}   Should Toggle between student and employee access */}
        </li>
        <li >
          <Link to="/scheduled" className="navLink">
            <b>Current Schedule</b>
          </Link>
        </li>
        <li >
          <Link to="/available" className="navLink">
            <b>Available Courses</b>
          </Link>
        </li>
        <li >
          <Link to="/transcript" className="navLink">
            <b>View Transcript</b>
          </Link>
        </li>
        <li >
          <Link to="/grads" className="navLink navLinkEmployee">
            <b>View Graduates</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
