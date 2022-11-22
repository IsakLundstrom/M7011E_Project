import React from "react";

const CourseEditPage = () => {
  return (
    <main>
      <h1>Edit Course</h1>
      <form action="">
        <label for="id">ID</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="id"
          disabled="disabled"
          value="1"
        />

        <br />

        <label for="name">Name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="name"
          value="Course 1"
        />

        <br />

        <label for="shortDescription">Short description</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="shortDescription"
          value="This is a short description"
        />

        <br />

        <label for="longDescription">Long description</label>
        <br />
        <textarea
          className="inputField"
          required
          name="longDescription"
          rows="5"
        >
          Elit do ipsum elit eu non enim pariatur esse ipsum id. Nulla dolor do
          eu cillum aliqua proident enim minim magna dolore. Non sint officia
          officia sint do amet et eiusmod commodo sint. Ipsum minim aliqua est
          ut nisi ex voluptate velit ipsum in amet. Est qui ut adipisicing magna
          qui aute esse fugiat.
        </textarea>

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

      <h2>Add new videos to the course</h2>

      <br />

      <form action="">
        <label for="name">Name</label>
        <br />
        <input className="inputField" required type="text" name="id" />

        <br />

        <label for="url">Url</label>
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
