import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAxios from "../utils/useAxios";

const UserEditPage = () => {
  const params = useParams();
  const api = useAxios();

  const [uID, setUID] = useState(-1);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${params.id}/`);
      setUID(response.data.id);
      setFName(response.data.fName);
      setLName(response.data.lName);
      setEmail(response.data.email);
    })();
  }, []);

  // patch user data
  const patchUser = async (e) => {
    e.preventDefault();

    if (password !== "") {
      try {
        await api.patch(`/changePassword/`, { newPassword: password });
      } catch {
        alert("Could not patch password");
      }
    }

    try {
      await api.patch(`/user/${params.id}/`, {
        fName: fName,
        lName: lName,
        email: email,
      });
    } catch {
      alert("Could not patch user");
    }

    //TODO add patch permision

    setPassword("");
    setRPassword("");
  };

  return (
    <main>
      <h1>Edit User</h1>
      <form onSubmit={patchUser}>
        <label htmlFor="id">ID</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="id"
          disabled="disabled"
          value={uID}
          onChange={(e) => setUID(e.target.value)}
        />

        <br />

        <label htmlFor="fname">First name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="fname"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />

        <br />

        <label htmlFor="lname">Last name</label>
        <br />
        <input
          className="inputField"
          required
          type="text"
          name="lname"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />

        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          className="inputField"
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label htmlFor="npassword">New Password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="npassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <label htmlFor="rpassword">Repeat Password</label>
        <br />
        <input
          className="inputField"
          type="password"
          name="rpassword"
          value={rpassword}
          onChange={(e) => setRPassword(e.target.value)}
        />

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
