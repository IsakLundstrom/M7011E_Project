import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const CourseEditPage = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);

  const [cID, setCID] = useState("");
  const [cName, setCName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [cImage, setCImage] = useState();

  const navigate = useNavigate();

  // get course
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/courses/" +
          window.location.pathname.substring(
            window.location.pathname.lastIndexOf("/") + 1
          )
      );
      const course = await response.json();
      setCID(course.courseID);
      setCName(course.courseName);
      setShortDescription(course.shortDescription);
      setLongDescription(course.longDescription);
      // setCImage(course.cImage)
    })();
  }, []);

  // handle put
  const putCourse = async (e) => {
    e.preventDefault();

    let res = await fetch(`http://localhost:8000/courses/${cID}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: cName,
        shortDescription: shortDescription,
        longDescription: longDescription,
        // image: cImage,
      }),
    });

    console.log(res);
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
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Url</th>
          <th>Delete</th>
        </tr>
        {[...Array(4)].map((e, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>Video name </td>
              <td>https://www.youtube.com/embed/tgbNymZ7vqY</td>
              <td>
                <button>❌</button>
              </td>
            </tr>
          );
        })}
      </table>

      <br />

      <h3>Add new videos to the course</h3>

      <br />

      <form action="">
        <label htmlFor="name">Name</label>
        <br />
        <input className="inputField" required type="text" name="id" />

        <br />

        <label htmlFor="url">Url</label>
        <br />
        <input className="inputField" required type="text" name="url" />

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

      <button className="profileButton deleteButton">Delete course</button>
    </main>
  );
};

export default CourseEditPage;
