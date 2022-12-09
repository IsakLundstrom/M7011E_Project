import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import homeImage from "../images/home_image.png";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("courseName");

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://127.0.0.1:8000/courses/`);
      const parsed = await response.json();
      setCourses(parsed);
    })();
  }, []);

  const searchCourses = async (e) => {
    e.preventDefault();

    console.log(
      `http://127.0.0.1:8000/courses/?ordering=${ordering}&search=${search}`
    );

    const response = await fetch(
      `http://127.0.0.1:8000/courses/?ordering=${ordering}&search=${search}`
    );
    const parsed = await response.json();
    setCourses(parsed);
  };
  // searchCourses();

  return (
    <main>
      <h1>Our courses</h1>
      <form className="coursesSearchForm" onSubmit={searchCourses}>
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
          <option value="courseName">A-Z</option>
          <option value="likeRatio">Like ratio</option>
          <option value="date">Date created</option>
        </select>

        <input className="coursesSortButton" type="submit" value="Sort" />
      </form>
      <div className="fiveCards">
        {courses &&
          courses.map((course) => {
            return (
              <Link
                to={`/courses/${course.courseID}`}
                className="card courseCard"
                key={course.courseID}
              >
                <div>
                  <img src={homeImage} alt="course" />
                  <div className="cardTextContainer">
                    <h3>
                      <b>{course.courseName} </b>
                    </h3>
                    <p>{course.shortDescription}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

export default CoursesPage;
