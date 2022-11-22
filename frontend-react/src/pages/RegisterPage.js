import React from "react";

const RegisterPage = () => {
  return (
    <main>
      <div className="loginContent">
        <h1>Register page</h1>
        <form action="">
          <br />

          <label for="fname">Name</label>
          <br />
          <input className="inputField" required type="text" name="fname" />

          <br />
          <br />

          <label for="lname">Lastname</label>
          <br />
          <input className="inputField" required type="text" name="lname" />

          <br />
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

          <label for="rpassword">Repeat password</label>
          <br />
          <input className="inputField" type="password" name="rpassword" />

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
