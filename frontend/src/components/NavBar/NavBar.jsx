import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./NavBar.css";

const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);  
  const navigate = useNavigate();
  return (
    <div className="navBar centered max-60width">
      <ul>
        <li className="navText brand centered">
          <Link to="/login" className="navText">
            <b>Integrated Registration Tracking System</b>
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
