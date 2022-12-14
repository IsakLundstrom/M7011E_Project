import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rpassword) {
      setErrorText("Password and repeated password must match");
      return;
    }

    try {
      await fetch("http://127.0.0.1:8000/auth/resetPasswordConfirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          uID: params.id,
          token: params.token,
        }),
      });

      navigate("/login");
    } catch {
      alert("Could not reset password");
    }
    setErrorText("");
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <br />

          {errorText !== "" && <div className="errorBox">{errorText}</div>}

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
