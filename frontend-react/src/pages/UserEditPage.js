import React from "react";

const UserEditPage = () => {
  return (
    <main>
      <h1>Edit User</h1>
      <form action="">
        <label htmlFor="id">ID</label>
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

        <label htmlFor="fname">First name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="fname"
          value="Bob"
        />

        <br />

        <label htmlFor="lname">Last name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="lname"
          value="Bobson"
        />

        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          className="inputField"
          required
          type="email"
          name="email"
          value="bob.bobson@gmail.com"
        />

        <br />

        <label htmlFor="npassword">New Password</label>
        <br />
        <input className="inputField" type="text" name="npassword" />

        <br />

        <label htmlFor="rpassword">Repeat Password</label>
        <br />
        <input className="inputField" type="text" name="rpassword" />

        <br />

        <input className="checkboxField" type="checkbox" name="staff" checked />
        <label htmlFor="staff">is Staff?</label>

        <br />

        <input className="checkboxField" type="checkbox" name="admin" />
        <label htmlFor="admin">is Admin?</label>

        <br />
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Update user"
        />

        <br />
        <br />
      </form>
      <button className="profileButton deleteButton">Delete user</button>
    </main>
  );
};

export default UserEditPage;
