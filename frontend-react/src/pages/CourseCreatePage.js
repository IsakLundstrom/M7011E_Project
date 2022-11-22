import React from "react";

const CourseCreatePage = () => {
  return (
    <main>
      <h1>Create Course</h1>
      <form action="">
        <label for="name">Name</label>
        <br />
        <input className="inputField" required type="text" name="name" />

        <br />

        <label for="shortDescription">Short description</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="shortDescription"
        />

        <br />

        <label for="longDescription">Long description</label>
        <br />
        <textarea
          className="inputField"
          required
          name="longDescription"
          rows="5"
        ></textarea>

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
