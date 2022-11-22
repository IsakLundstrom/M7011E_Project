import React from "react";
import { Link } from "react-router-dom";

import profileImage from "../images/default_profile.png";

const Header = () => {
  return (
    <nav className="mainNav">
      <ul>
        <li className="floatLeft">
          <Link className="mainLink" to="/">
            Home
          </Link>
        </li>

        <li className="floatLeft">
          <div className="subnav">
            <Link className="mainLink" to="/course">
              Courses
            </Link>
            <div class="subnavContent">
              <h2>Search for courses</h2>
              <input
                className="inputField"
                type="text"
                placeholder="Search.."
              />
              <table className="subnavTable">
                <tr>
                  <th>Course</th>
                  <th>Short Description</th>
                </tr>
                {[...Array(3)].map((e, i) => {
                  return (
                    <tr>
                      <td>
                        <Link to={`/course/${i + 1}`}>Course {i + 1}</Link>
                      </td>
                      <td>Course short description!</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </li>

        <li className="floatLeft">
          <Link className="mainLink" to="/about">
            About
          </Link>
        </li>

        <li className="floatLeft">
          <Link className="mainLink" to="/admin">
            Admin pages
          </Link>
        </li>

        <li className="floatRight">
          <Link className="mainLink" to="/register">
            Register
          </Link>
        </li>

        <li className="floatRight">
          <Link className="mainLink" to="/login">
            Log in
          </Link>
        </li>

        <li>
          <Link className="mainLink profileImageLink floatRight" to="/profile">
            <div className="headerProfileImageContainer">
              <img src={profileImage} alt="Profile" />
            </div>
          </Link>
        </li>

        <li className="floatRight">
          <Link className="mainLink" to="/">
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
