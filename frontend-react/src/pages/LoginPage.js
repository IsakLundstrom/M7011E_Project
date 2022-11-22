import React from "react";

const LoginPage = () => {
  return (
    <main>
      <div className="loginContent">
        <h1>Login page</h1>
        <form action="">
          <br />

          <label for="email">Email</label>
          <br />
          <input className="inputField" required type="email" name="email" />

          <br />
          <br />

          <label for="password">Password</label>
          <br />
          <input className="inputField" type="password" name="password" />

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
