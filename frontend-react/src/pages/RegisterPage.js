import React, { useState } from "react";

const RegisterPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        // rpassword: rpassword,
      }),
    });

    console.log(res);
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
          <br />

          <label for="fname">Name</label>
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

          <label for="lname">Lastname</label>
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

          <label for="email">Email</label>
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

          <label for="password">Password</label>
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

          <label for="rpassword">Repeat password</label>
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
            value="Register"
          />
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
