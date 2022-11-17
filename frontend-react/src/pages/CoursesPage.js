import React from "react";
import { Link } from "react-router-dom";

import homeImage from "../images/home_image.png";

const CoursesPage = () => {
  return (
    <main>
      <h1>The courses</h1>
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
