import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const LoginPage = () => {
  const clientId =
    "1064260607969-f2mrhl9a60tm9g81k2qc25jtjdc0uh01.apps.googleusercontent.com";

  const api = useAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { loginUser, registerUser } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    let err = await loginUser(email, password);
    setError(err);
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();
    console.log("try send reset email ");

    try {
      await api.post(`/resetPassword/`, { email: email });
    } catch {
      alert("Could not send reset email");
    }
  };

  const onGoogleSuccess = async (res) => {
    const profile = res.profileObj;
    let err = await loginUser(profile.email, profile.googleId);
    if (err) {
      console.log("Registering google user...");
      await registerUser(
        profile.givenName,
        profile.familyName,
        profile.email,
        profile.googleId
      );
      console.log("Logging in google user now...");
      await loginUser(profile.email, profile.googleId);
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
          <form onSubmit={login}>
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
          />

          <p>
            Don't have an account? Register&nbsp;
            <Link to={`/register`}>here</Link>!
          </p>

          <p>
            Forgot your password? Click&nbsp;
            <a href="#popupContainer">here</a>.
          </p>
        </div>
      </main>

      <div id="popupContainer">
        <div id="popup" class="popup">
          <div className="resetPasswordContent">
            <h2>Reset password</h2>
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
              <a href="#">Close</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
