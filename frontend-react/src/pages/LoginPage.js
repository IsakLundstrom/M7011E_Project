import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  };

  return (
    <main>
      <div className="loginContent">
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
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

          <input
            className="profileButton profileUpdateButton"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
