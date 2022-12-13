import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const CourseCreatePage = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cName, setCName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [cImage, setCImage] = useState();

  const postCourse = async (e) => {
    e.preventDefault();

    let res = await api.post("http://localhost:8000/courses/", {
      courseName: cName,
      shortDescription: shortDescription,
      longDescription: longDescription,
      courseIMG: cImage,
    });

    console.log(res);
    if (user.is_superuser) {
      navigate("/admin/courses");
    } else if (user.is_staff) {
      navigate("/profile");
    }
  };

  return (
    <main>
      <h1>Create Course</h1>
      <form onSubmit={postCourse}>
        <label htmlFor="cname">Name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="cname"
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
          required
          type="file"
          name="image"
          onChange={(e) => setCImage(e.target.files[0])}
        />

        <br />
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Create course"
        />
      </form>
    </main>
  );
};

export default CourseCreatePage;
