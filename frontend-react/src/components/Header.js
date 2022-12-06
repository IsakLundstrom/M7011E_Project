import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import profileImage from "../images/default_profile.png";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

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
            <Link className="mainLink" to="/courses">
              Courses
            </Link>
            <div className="subnavContent">
              <h2>Search for courses</h2>
              <input
                className="inputField"
                type="text"
                placeholder="Search.."
              />
              <table className="subnavTable">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Short Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((e, i) => {
                    return (
                      <tr key={i + 1}>
                        <td>
                          <Link to={`/courses/${i + 1}`}>Course {i + 1}</Link>
                        </td>
                        <td>Course short description!</td>
                      </tr>
                    );
                  })}
                </tbody>
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
        {!user ? (
          <>
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
          </>
        ) : (
          <>
            <li>
              <Link
                className="mainLink profileImageLink floatRight"
                to="/profile"
              >
                <div className="headerProfileImageContainer">
                  <img src={profileImage} alt="Profile" />
                </div>
              </Link>
            </li>

            <li className="floatRight">
              <Link className="mainLink" to="/" onClick={logoutUser}>
                Log out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
