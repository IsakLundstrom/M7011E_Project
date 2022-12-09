import React, { useState } from "react";
import { Link } from "react-router-dom";

// import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = await loginUser(email, password);
    setError(err);
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Login page</h1>
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

        <p>
          Don't have an account? Register&nbsp;
          <Link to={`/register`}>here</Link>!
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
