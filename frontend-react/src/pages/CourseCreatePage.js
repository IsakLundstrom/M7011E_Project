import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseCreatePage = () => {
  const [cName, setCName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [cImage, setCImage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:8000/courses/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseName: cName,
        shortDescription: shortDescription,
        longDescription: longDescription,
        // image: cImage,
      }),
    });

    console.log(res);
    navigate("/admin/courseList");
  };

  return (
    <main>
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
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
          value="Create course"
        />
      </form>
    </main>
  );
};

export default CourseCreatePage;
