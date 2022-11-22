import React from "react";
import { Link } from "react-router-dom";

const CourseListPage = () => {
  return (
    <main>
      <h1>All courses</h1>

      <Link className="coursesSortButton" to={`/admin/courseCreate`}>
        Create new course
      </Link>

      <table className="adminTable">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Short description</th>
          <th>Like Ratio</th>
          <th>Edit</th>
        </tr>
        {[...Array(20)].map((e, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>Course name {i + 1}</td>
              <td>This is a short description!</td>
              <td>100%</td>
              <td>
                <Link to={`/admin/courseEdit/${i + 1}`}>&#x270D;</Link>
              </td>
            </tr>
          );
        })}
      </table>
    </main>
  );
};

export default CourseListPage;
