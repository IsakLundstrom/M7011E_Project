import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";

const UserEditPage = () => {
  const api = useAxios();
  const params = useParams();
  const navigate = useNavigate();

  const [uID, setUID] = useState(-1);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [isStaff, setStaff] = useState(false);
  const [isSuperuser, setSuperuser] = useState(false);

  const [deletePressed, setDelete] = useState(false);

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${params.id}/`);
      setUID(response.data.id);
      setFName(response.data.fName);
      setLName(response.data.lName);
      setEmail(response.data.email);
      setStaff(response.data.is_staff);
      setSuperuser(response.data.is_superuser);
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
      const res = await api.patch(`/user/${params.id}/`, {
        fName: fName,
        lName: lName,
        email: email,
        is_staff: isStaff,
        is_superuser: isSuperuser,
      });
      console.log(res);
      setUpdated(true);
    } catch {
      alert("Could not patch user");
      setUpdated(false);
    }

    setPassword("");
    setRPassword("");
  };

  // delete user
  const deleteUser = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/user/${uID}/`);
      navigate("/admin/users");
    } catch {
      alert("Could not delete user");
    }
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

        <input
          className="checkboxField"
          type="checkbox"
          name="staff"
          checked={isStaff}
          onChange={async (e) => setStaff(e.target.checked)}
        />
        <label htmlFor="staff">is Staff?</label>

        <br />

        <input
          className="checkboxField"
          type="checkbox"
          name="admin"
          checked={isSuperuser}
          onChange={async (e) => setSuperuser(e.target.checked)}
        />
        <label htmlFor="admin">is Admin?</label>

        <br />
        {updated && <div className="successBox">User updated!</div>}
        <br />

        <input
          className="profileButton profileUpdateButton"
          type="submit"
          value="Update user"
        />

        <br />
        <br />
      </form>
      <button
        className="profileButton profileDeleteButton deleteButton"
        onClick={() => setDelete(true)}
      >
        Delete user
      </button>
      {deletePressed && (
        <div className="confirmBox">
          <p>Do you really want to delete this user?</p>
          <button className="profileButton deleteButton" onClick={deleteUser}>
            Yes
          </button>
          <button
            className="profileButton profileUpdateButton"
            onClick={() => setDelete(false)}
          >
            No
          </button>
        </div>
      )}
    </main>
  );
};

export default UserEditPage;
