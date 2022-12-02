import React, { useEffect, useState } from "react";

import homeImage from "../images/home_image.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CoursePage = () => {
  const [visible, setVisible] = useState(false);

  const [course, setCourse] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/courses/" +
          window.location.pathname.substring(
            window.location.pathname.lastIndexOf("/") + 1
          )
      );
      const parsed = await response.json();
      setCourse(parsed);
    })();
  }, []);

  return (
    <main>
      <div className="courseImageContainer">
        <div className="imageGradient"></div>
        <img src={homeImage} alt="Home" />
        <h1 className="textBottomLeft">{course.courseName}</h1>
        <p className="textBottomRight">Like ratio: XX%</p>
      </div>

      <div className="courseContent">
        <div className="courseLeftContent">
          <div className="courseButtons">
            <button>
              <p>Subscribe</p>
            </button>
            <button>
              <p>👍 </p>
            </button>
            <button>
              <p> 👎</p>
            </button>
          </div>
          <div className="courseDescription">
            <button onClick={() => setVisible(!visible)}>
              Description {visible ? "▲" : "▼"}
            </button>
            <div className="courseDescriptionTextBox ">
              {visible && <p>{course.longDescription}</p>}
            </div>
          </div>
        </div>
        <Carousel showThumbs={false}>
          {[...Array(5)].map((e, i) => {
            return (
              <div className="courseVideos">
                <iframe
                  title="video"
                  src="https://www.youtube.com/embed/tgbNymZ7vqY"
                ></iframe>
              </div>
            );
          })}
        </Carousel>
      </div>
    </main>
  );
};

export default CoursePage;
