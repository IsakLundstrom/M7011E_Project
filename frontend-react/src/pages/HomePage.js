import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import homeImage from "../images/home_image.png";
import dumbellSvg from "../images/dumbell_svg.svg";
import runSvg from "../images/run_svg.svg";
import fotballSvg from "../images/fotball_svg.svg";

const HomePage = () => {
  // Test fetch and set data
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/courses/");
      const parsed = await response.json();
      setData(parsed);
      console.log(parsed);
    })();
  }, []);

  return (
    <main>
      <div className="homeImageContainer">
        <div className="imageGradient"></div>
        <img src={homeImage} alt="Home" />
        <h1 className="homeH1 textBottomLeft">Home page</h1>
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

      <h2 className="homeH2"> Top 3 courses right now! </h2>

      <div className="threeCards">
        <Link to="/courses/1" className="card courseCard">
          <div>
            <img src={homeImage} alt="course" />
            <div className="cardTextContainer">
              <h3>
                <b>Course 1</b>
              </h3>
              <p>Come and gym for free at 24/7Fittness every Monday 7am!</p>
            </div>
          </div>
        </Link>

        <Link to="/courses/2" className="card courseCard">
          <div>
            <img src={homeImage} alt="course" />
            <div className="cardTextContainer">
              <h3>
                <b>Course 2</b>
              </h3>
              <p>
                Come and do some uphill training at 3am every Sunday on
                Ormberget's skislope!
              </p>
            </div>
          </div>
        </Link>

        <Link to="/courses/3" className="card courseCard">
          <div>
            <img src={homeImage} alt="course" />
            <div className="cardTextContainer">
              <h3>
                <b>Course 3</b>
              </h3>
              <p>Come and play fotball with us! Everyones invited!</p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
