import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("courseID");

  useEffect(() => {
    (async (e) => {
      const response = await fetch(
        `http://127.0.0.1:8000/courses/?ordering=${ordering}&search=${search}`
      );
      const parsed = await response.json();
      setCourses(parsed);
    })();
  }, [search, ordering]);

  return (
    <main>
      <h1>All courses</h1>

      <br />
      <Link className="coursesSortButton" to={`/courses/create`}>
        Create new course
      </Link>
      <br />
      <br />

      <form className="coursesSearchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          className="inputField"
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label>Sort by: </label>

        <select
          className="inputField"
          name="sort"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="courseID">CourseID ⬇</option>
          <option value="-courseID">CourseID ⬆</option>
          <option value="likeRatio">Like ratio ⬇</option>
          <option value="-likeRatio">Like ratio ⬆</option>
          <option value="courseName">Name ⬇</option>
          <option value="-courseName">Name ⬆</option>
          <option value="owner">Owner ⬇</option>
          <option value="-owner">Owner ⬆</option>
        </select>
      </form>

      <br />

      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Name</th>
            <th>Short description</th>
            <th>Like Ratio</th>
            <th>Edit</th>
          </tr>
          {courses &&
            courses.map((course) => {
              return (
                <tr key={course.courseID}>
                  <td>{course.courseID}</td>
                  <td>{course.owner}</td>
                  <td>{course.courseName}</td>
                  <td>{course.shortDescription}</td>
                  <td>{`${course.likeRatio}%`}</td>
                  <td>
                    <Link to={`/courses/${course.courseID}/edit`}>
                      &#x270D;
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};

export default CourseListPage;
