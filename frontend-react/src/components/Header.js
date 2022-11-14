import React from "react";
import { Link } from "react-router-dom";

import profileImage from "../images/default_profile.png";

const Header = () => {
  return (
    <nav className="mainNav">
      <ul>
        <li className="floatLeft">
          <Link to="/">Home</Link>
        </li>
        <li className="floatLeft">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="floatLeft">
          <Link to="/about">About</Link>
        </li>
        <li className="floatLeft">
          <Link to="/admin">Admin pages</Link>
        </li>
        <li>
          <Link className="profileImageLink floatRight" to="/">
            <div className="profileImageContainer">
              <img src={profileImage} alt="Profile" />
            </div>
          </Link>
        </li>
        <li className="floatRight">
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
