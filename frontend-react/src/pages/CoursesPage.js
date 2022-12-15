import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-courseID");

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
      <h1>Our courses</h1>
      <form className="coursesSearchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          className="inputField"
          type="text"
          placeholder="Search..."
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
          <option value="-courseID">Latest</option>
          <option value="courseID">Oldest</option>
          <option value="likeRatio">Like ratio</option>
          <option value="courseName">Name A-Z</option>
          <option value="-courseName">Name Z-A</option>
        </select>
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
                  <img src={course.courseIMG} alt="course" />
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
