import React, { useEffect, useState /*, useContext*/ } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxios from "../utils/useAxios";

const CourseEditPage = () => {
  const params = useParams();
  const api = useAxios();
  const navigate = useNavigate();

  // course variables
  const [cID, setCID] = useState(-1);
  const [cAuthor, setCAuthor] = useState("");
  const [cName, setCName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [cImage, setCImage] = useState();

  // video variables
  const [videos, setVideos] = useState([]);
  const [newVidName, setNewVidName] = useState("");
  const [newVidUrl, setNewVidUrl] = useState("");

  // get course
  useEffect(() => {
    (async () => {
      const response = await api.get(
        `http://127.0.0.1:8000/courses/${params.id}`
      );
      const course = await response.data;
      getVideos();

      setCID(course.courseID);
      setCAuthor(course.author);
      setCName(course.courseName);
      setShortDescription(course.shortDescription);
      setLongDescription(course.longDescription);
      setCImage(course.courseIMG);
    })();
  }, []);

  // put course
  const putCourse = async (e) => {
    e.preventDefault();

    let res = await api.put(`/courses/${params.id}/`, {
      courseName: cName,
      shortDescription: shortDescription,
      longDescription: longDescription,
      courseIMG: cImage,
    });

    console.log(res);
  };

  // delete course
  const deleteCourse = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/courses/${params.id}/`);
      navigate("/admin/courses");
    } catch {
      alert("Could not delete video");
    }
  };

  // get videos
  function getVideos() {
    (async () => {
      const response = await api.get(`/courses/${params.id}/videos`);
      const videos = await response.data;
      setVideos(videos);
    })();
  }

  // post video
  const postVideo = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/courses/${params.id}/videos/`, {
        courseID: cID,
        videoName: newVidName,
        videoURL: newVidUrl,
        // courseAuthor: cAuthor,
      });
      await getVideos();
    } catch {
      alert("Could not post new video");
    }
  };

  //delete video
  const deleteVideo = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/courses/${params.id}/videos/${e.target.value}/`);
      await getVideos();
    } catch {
      alert("Could not delete video");
    }
  };

  return (
    <main>
      <h1>Edit Course</h1>
      <form onSubmit={putCourse}>
        <label htmlFor="id">ID</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="id"
          disabled="disabled"
          value={cID}
          onChange={(e) => setCID(e.target.value)}
        />

        <br />

        <label htmlFor="name">Name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="name"
          value={cName}
          onChange={(e) => setCName(e.target.value)}
        />

        <br />

        <label htmlFor="shortDescription">Short description</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        <br />

        <label htmlFor="longDescription">Long description</label>
        <br />
        <textarea
          className="inputField"
          required
          name="longDescription"
          rows="5"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        ></textarea>

        <br />

        <label htmlFor="image">Image</label>
        <br />
        <input
          className=""
          // required
          type="file"
          name="image"
          onChange={(e) => setCImage(e.target.files[0])}
        />

        <br />
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Update course"
        />

        <br />
        <br />
        <br />
      </form>

      <h2>Current videos in the course</h2>
      <br />

      <table className="adminTable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Url</th>
            <th>Delete</th>
          </tr>
          {videos &&
            videos.map((video) => {
              return (
                <tr key={video.videoID}>
                  <td>{video.videoID}</td>
                  <td>{video.videoName}</td>
                  <td>{video.videoURL}</td>
                  <td>
                    <button value={video.videoID} onClick={deleteVideo}>
                      ❌
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <br />

      <h3>Add new videos to the course</h3>

      <br />

      <form onSubmit={postVideo}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="name"
          value={newVidName}
          onChange={(e) => setNewVidName(e.target.value)}
        />

        <br />

        <label htmlFor="url">Url</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="url"
          value={newVidUrl}
          onChange={(e) => setNewVidUrl(e.target.value)}
        />

        <br />
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Add new video"
        />

        <br />
        <br />
      </form>

      <button className="profileButton deleteButton" onClick={deleteCourse}>
        Delete course
      </button>
    </main>
  );
};

export default CourseEditPage;
