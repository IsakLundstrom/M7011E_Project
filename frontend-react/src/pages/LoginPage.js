import React, { useState } from "react";
import { Link } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

// import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const clientId =
    "1064260607969-f2mrhl9a60tm9g81k2qc25jtjdc0uh01.apps.googleusercontent.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { loginUser, registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = await loginUser(email, password);
    setError(err);
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
    <main>
      <div className="loginContent">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          onRequest={console.log("Trying to log in google user...")}
          cookiePolicy={"single_host_origin"}
        />

        <p>
          Don't have an account? Register&nbsp;
          <Link to={`/register`}>here</Link>!
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
