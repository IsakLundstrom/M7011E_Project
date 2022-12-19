import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import homeImage from "../images/home_image.png";
import dumbellSvg from "../images/dumbell_svg.svg";
import runSvg from "../images/run_svg.svg";
import fotballSvg from "../images/fotball_svg.svg";

const HomePage = () => {
  const location = useLocation();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/courses/?ordering=-courseID"
      );
      const parsed = await response.json();
      setCourses(parsed);
    })();
  }, []);

  return (
    <main>
      <div className="homeImageContainer">
        <div className="imageGradient"></div>
        <img src={homeImage} alt="Home" />
        <h1 className="homeH1 textBottomLeft">The Sweat Zone</h1>
      </div>

      <h2 className="homeH2"> We are fitness! </h2>

      <div className="threeCards threeMotivationCards">
        <div className="card motivationCard">
          <img src={dumbellSvg} alt="Dumbell" />
          <div className="cardTextContainer">
            <h3>
              <b>Gym training!</b>
            </h3>
            <p>Train at the gym with different exercises every week 🏋️!</p>
          </div>
        </div>

        <div className="card motivationCard">
          <img src={runSvg} alt="Run" />
          <div className="cardTextContainer">
            <h3>
              <b>Run every day!</b>
            </h3>
            <p>
              Get free running tips every day or come alnog and run with us 🏃‍♀️!
            </p>
          </div>
        </div>

        <div className="card motivationCard">
          <img src={fotballSvg} alt="Fotball" />
          <div className="cardTextContainer">
            <h3>
              <b>Sports!</b>
            </h3>
            <p>
              We have many different sports that you can try with us! ⚽, 🏀,
              ⚾, 🏒, 🎾, 🏌️‍♂️, 🤣, 🚴‍♀️ and much more!
            </p>
          </div>
        </div>
      </div>

      <h2 className="homeH2"> Our 3 latest courses! 🔥 </h2>

      <div className="threeCards">
        {courses &&
          courses.slice(0, 3).map((course) => {
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

      <h2 className="homeH2">News</h2>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="LTUniv"
        options={{ height: 400 }}
      />
    </main>
  );
};

export default HomePage;
