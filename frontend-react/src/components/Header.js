import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import profileImage from "../images/default_profile.png";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/courses/?ordering=-courseID&search=${search}`
      );
      const parsed = await response.json();
      setCourses(parsed);
    })();
  }, [search]);

  // useEffect(() => {
  //   console.log()
  //   searchCourse();
  // }, [search]);

  // const searchCourse = async (e) => {
  //   const response = await fetch(
  //     `http://127.0.0.1:8000/courses/?search=${search}`
  //   );
  //   const parsed = await response.json();
  //   setCourses(parsed);
  // };

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <table className="subnavTable">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Short Description</th>
                  </tr>
                </thead>
                <tbody>
                  {courses &&
                    courses.slice(0, 3).map((course) => {
                      return (
                        <tr key={course.courseID}>
                          <td>
                            <Link to={`/courses/${course.courseID}`}>
                              {course.courseName}
                            </Link>
                          </td>
                          <td>{course.shortDescription}</td>
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
        {user && user.is_superuser && (
          <li className="floatLeft">
            <Link className="mainLink" to="/admin">
              Admin pages
            </Link>
          </li>
        )}
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
