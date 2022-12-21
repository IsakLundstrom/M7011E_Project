import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import google from "../secrets/google.json";

import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const LoginPage = () => {
  const clientId = google.clientID;

  const api = useAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token2FA, setToken2FA] = useState("");

  const [has2FA, setHas2FA] = useState(false);
  const [error, setError] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { loginUser, loginUser2FA, registerUser } = useContext(AuthContext);

  const sendLogin = async (e) => {
    e.preventDefault();
    let res = await loginUser(email, password);
    if (res.err) {
      setError(res.err);
    } else if (res.has2FA) {
      setHas2FA(true);
    }
  };

  const send2FA = async (e) => {
    e.preventDefault();
    console.log("send 2FA");
    let res = await loginUser2FA(email, password, token2FA);
    setError(res.err);
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();

    setResetSent(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/resetPassword/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, port: 3000 }),
        }
      );
    } catch {
      alert("Could not send reset email");
    }
  };

  const onGoogleSuccess = async (response) => {
    const profile = response.profileObj;

    let res = await loginUser(profile.email, profile.googleId);

    if (res.err) {
      console.log("Registering google user...");
      await registerUser(
        profile.givenName,
        profile.familyName,
        profile.email,
        profile.googleId
      );

      console.log("Logging in google user now...");
      await loginUser(profile.email, profile.googleId);
    } else if (res.has2FA) {
      setEmail(profile.email);
      setPassword(profile.googleId);
      setHas2FA(true);
    }
  };

  const onGoogleFailure = async (err) => {
    console.log("Google signin failed", err);
  };

  return (
    <>
      <main>
        <div className="loginContent">
          <h1>Login</h1>
          <form onSubmit={sendLogin}>
            <br />
            {error && <div className="errorBox">Wrong email or password</div>}

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
            <br />

            <label htmlFor="password">Password</label>
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

            <input
              className="profileButton profileUpdateButton"
              type="submit"
              value="Login"
            />

            <br />
            <br />
          </form>

          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={"single_host_origin"}
            prompt={"select_account"}
          />

          <p>
            Don't have an account? Register&nbsp;
            <Link to={`/register`}>here</Link>!
          </p>

          <p>
            Forgot your password? Click&nbsp;
            <a href="#resetPasswordPopup">here</a>.
          </p>
        </div>
      </main>

      <div id="resetPasswordPopup" className="popupContainer">
        <div id="popup" className="popup">
          <div className="resetPasswordContent">
            <h2>Reset password</h2>

            {resetSent && (
              <p>
                Link to reset your password has been sent to <b>{email}</b>
              </p>
            )}

            <form onSubmit={sendResetEmail}>
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
              <br />

              <input
                className="profileButton profileUpdateButton"
                type="submit"
                value="Send"
              />

              <br />
              <br />
            </form>
            <p>
              <a href="#" style={{ color: "black", textDecoration: "none" }}>
                ❌
              </a>
            </p>
          </div>
        </div>
      </div>

      {has2FA && (
        <div className="popupContainer resetPopupContainer">
          <div id="popup" className="popup">
            <div className="resetPasswordContent">
              <h2>2FA</h2>
              <p>
                Two factor authentication nedded, the code has been sent to{" "}
                <b>{email}</b>.
              </p>
              <form onSubmit={send2FA}>
                <br />

                <label htmlFor="2fa">Code</label>
                <br />
                <input
                  className="inputField"
                  required
                  autoComplete="off"
                  type="text"
                  name="2fa"
                  value={token2FA}
                  onChange={(e) => setToken2FA(e.target.value)}
                />

                <br />
                <br />

                <input
                  className="profileButton profileUpdateButton"
                  type="submit"
                  value="Login"
                />

                <br />
                <br />
              </form>

              <p>
                <a
                  onClick={(e) => setHas2FA(false)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
