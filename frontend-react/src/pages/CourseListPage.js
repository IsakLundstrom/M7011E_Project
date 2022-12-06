import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/courses/");
      const parsed = await response.json();
      setCourses(parsed);
    })();
  }, []);

  return (
    <main>
      <h1>All courses</h1>

      <br />
      <Link className="coursesSortButton" to={`/admin/courseCreate`}>
        Create new course
      </Link>
      <br />
      <br />

      <table className="adminTable">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Short description</th>
          <th>Like Ratio</th>
          <th>Edit</th>
        </tr>
        {courses &&
          courses.map((course) => {
            return (
              <tr>
                <td>{course.courseID}</td>
                <td>{course.courseName}</td>
                <td>{course.shortDescription}</td>
                <td>{`${course.LikeRatio}%`}</td>
                <td>
                  <Link to={`/admin/courseEdit/${course.courseID}`}>
                    &#x270D;
                  </Link>
                </td>
              </tr>
            );
          })}
      </table>
    </main>
  );
};

export default CourseListPage;
