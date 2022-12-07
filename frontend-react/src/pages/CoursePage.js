import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

import homeImage from "../images/home_image.png";

const CoursePage = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState({});
  const [subscribed, setSubscribe] = useState(false);

  // get course
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

      if (response.status !== 200) {
        setError(true);
      }
    })();
  }, []);

  // subscribe
  const postSubsribe = async (e) => {
    try {
      await api.post(`/subscription/`, {
        userID: user.user_id,
        courseID: course.courseID,
      });
    } catch {
      alert("Could not subscribe");
    }
  };

  // like / unlike
  const putLike = async (e) => {
    try {
      await api.put(`/subscription/${course.courseID}/`, {
        userID: user.user_id,
        courseID: course.courseID,
        like: e.target.value,
      });
    } catch {
      alert("Could not like");
    }
  };

  return (
    <main>
      {error ? (
        <div>
          <p>
            This course does not exist, but you check out all our other
            courses&nbsp;
            <Link to={`/courses`}>here</Link>.
          </p>
        </div>
      ) : (
        <>
          <div className="courseImageContainer">
            <div className="imageGradient"></div>
            <img src={homeImage} alt="Home" />
            <h1 className="textBottomLeft">{course.courseName}</h1>
            <p className="textBottomRight">{`Like ratio: ${course.LikeRatio}%`}</p>
          </div>

          <div className="courseContent">
            <div className="courseLeftContent">
              {user && (
                <div className="courseButtons">
                  {!subscribed && (
                    <button onClick={postSubsribe}>
                      <p>Subscribe</p>
                    </button>
                  )}
                  <button onClick={putLike} value={1}>
                    <p>👍 </p>
                  </button>
                  <button onClick={putLike} value={0}>
                    <p> 👎</p>
                  </button>
                </div>
              )}
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
                  <div className="courseVideos" key={i}>
                    <iframe
                      title="video"
                      src="https://www.youtube.com/embed/tgbNymZ7vqY"
                    ></iframe>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
    </main>
  );
};

export default CoursePage;
