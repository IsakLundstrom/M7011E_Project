import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rpassword) {
      setErrorText("Password and repeated password must match");
      return;
    }
    const err = await registerUser(fName, lName, email, password);
    setErrorText(err);
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <br />

          {errorText !== "" && <div className="errorBox">{errorText}</div>}

          <label htmlFor="fname">Name</label>
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
          <br />

          <label htmlFor="lname">Lastname</label>
          <br />
          <input
            className="inputField"
            required
            type="text"
            name="lname"
            value={lName}
            onChange={(e) => setlName(e.target.value)}
          />

          <br />
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

          <label htmlFor="password">Password</label>
          <br />
          <input
            className="inputField"
            required
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
            required
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
            value="Register"
          />

          <br />
          <br />
        </form>
        <p>
          Already have an account? Login&nbsp;
          <Link to={`/login`}>here</Link>!
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
