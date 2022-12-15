import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useAxios from "../utils/useAxios";

const ResetPasswordPage = () => {
  const params = useParams();
  const api = useAxios();

  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("try reset password");

    try {
      await fetch('http://127.0.0.1:8000/resetPasswordConfirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        password: password,
        rpassword: rpassword,
        uID: params.id,
        token: params.token,})
      });
    } catch {
      alert("Could not reset password");
    }
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <br />

          <label htmlFor="password">New Password</label>
          <br />
          <input
            className="inputField"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <br />

          <label htmlFor="rpassword">Repeat password</label>
          <br />
          <input
            className="inputField"
            type="password"
            name="rpassword"
            value={rpassword}
            onChange={(e) => setRPassword(e.target.value)}
          />

          <br />
          <br />

          <input
            className="profileButton profileUpdateButton"
            type="submit"
            value="Reset"
          />

          <br />
          <br />
        </form>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
