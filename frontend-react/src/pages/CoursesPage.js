import React from "react";
import { Link } from "react-router-dom";

import homeImage from "../images/home_image.png";

const CoursesPage = () => {
  return (
    <main>
      <h1>Our courses</h1>
      <form className="coursesSearchForm" action="">
        <input className="inputField" type="text" placeholder="Search.." />

        <label for="cars">Sort by: </label>

        <select className="inputField" name="casortrs">
          <option value="A-Z">A-Z</option>
          <option value="likeRatio">Like ratio</option>
          <option value="date">Date created</option>
        </select>

        <input className="coursesSortButton" type="submit" value="Sort" />
      </form>
      <div className="fiveCards">
        {[...Array(18)].map((e, i) => {
          return (
            <Link to={`/course/${i + 1}`} className="card courseCard">
              <div>
                <img src={homeImage} alt="course" />
                <div class="cardTextContainer">
                  <h3>
                    <b>Course {i + 1} </b>
                  </h3>
                  <p>Course short description!</p>
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
