import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./NavBar.css";

const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);  
  const navigate = useNavigate();
  return (
    <div className="navBar centered max-45width">
          {user ? (
              <><label>
            <span className="navText brand centered">
              <input className="dummy centered max-125width label-text"
                type="text"
                name="search" /></span>
            <span className="label-text"><Link to={'#'} className="dummy">Search</Link></span>
          </label>
                <span><button onClick={logoutUser}>Logout</button></span></>
      ) : (
        <span className="navText brand centered">
          <b>Integrated Registration Tracking System</b>
        </span>
      )
          }
    </div>
  );
};

export default Navbar;
