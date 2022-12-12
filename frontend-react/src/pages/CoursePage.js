import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

import homeImage from "../images/home_image.png";

const CoursePage = () => {
  const params = useParams();
  const api = useAxios();
  const { user } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const [course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribe] = useState(false);
  const [subscribeID, setSubscribeID] = useState(-1);
  const [liked, setLike] = useState(-1);
  const [likeID, setLikeID] = useState(-1);

  // get course
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/courses/${params.id}`
      );
      const course = await response.json();
      setCourse(course);

      if (response.status !== 200) {
        setError(true);
      }
    })();
  }, [params]);

  // get videos
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/courses/${params.id}/videos`
      );
      const videos = await response.json();
      setVideos(videos);
    })();
  }, [params]);

  // get subscribe
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `courses/${params.id}/subscriptions/${user.user_id}`
        );
        setSubscribe(response.data.subID ? true : false);
        setSubscribeID(response.data.subID);
      } catch {
        // alert("Could not get subscription");
      }
    })();
  }, [params]);

  // post subscribe
  const postSubscribe = async (e) => {
    try {
      const response = await api.post(`courses/${params.id}/subscriptions/`, {
        userID: user.user_id,
        courseID: course.courseID,
      });
      setSubscribe(response.data.subID ? true : false);
      setSubscribeID(response.data.subID);
    } catch {
      alert("Could not post subscribe");
    }
  };

  // delete subscribe
  const deleteSubscribe = async (e) => {
    try {
      const response = await api.delete(
        `courses/${params.id}/subscriptions/${subscribeID}`
      );

      setSubscribe(response.data.subID ? true : false);
      setSubscribeID(response.data.subID);
    } catch {
      alert("Could not unsubscribe");
    }
  };

  // get like / unlike
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(
          `courses/${params.id}/likes/${user.user_id}`
        );
        setLike(response.data.like ? response.data.like : -1);
        setLikeID(response.data.likeID ? response.data.likeID : -1);
      } catch {
        // alert("Could not get like");
      }
    })();
  }, [liked, params]);

  // post/put like / unlike
  const postPutLike = async (e) => {
    try {
      let response;
      if (likeID === -1) {
        response = await api.post(`courses/${params.id}/likes/`, {
          userID: user.user_id,
          courseID: course.courseID,
          like: e.currentTarget.value,
        });
      } else {
        response = await api.put(`courses/${params.id}/likes/${likeID}/`, {
          userID: user.user_id,
          courseID: course.courseID,
          like: e.currentTarget.value,
        });
      }
      setLike(response.data.like);
      setLikeID(response.data.likeID ? response.data.likeID : -1);
    } catch {
      alert("Could not like");
    }
  };

  return (
    <main>
      {error ? (
        <div>
          <p>
            This course does not exist, but you can check out all our other
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
            <p className="textBottomRight">{`Like ratio: ${course.likeRatio}%`}</p>
          </div>

          <div className="courseContent">
            <div className="courseLeftContent">
              {user && (
                <div className="courseButtons">
                  {!subscribed ? (
                    <button onClick={postSubscribe}>
                      <p>Subscribe</p>
                    </button>
                  ) : (
                    <button onClick={deleteSubscribe}>
                      <p>Unsubscribe</p>
                    </button>
                  )}
                  <button onClick={postPutLike} value={1}>
                    <p>👍 </p>
                  </button>
                  <button onClick={postPutLike} value={0}>
                    <p> 👎</p>
                  </button>
                </div>
              )}
              <p>Course created by: {course.owner}</p>
              <br />
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
              {videos &&
                videos.map((video) => {
                  return (
                    <div className="courseVideos" key={video.videoID}>
                      <iframe
                        title={video.videoName}
                        src={video.videoURL}
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
