import React from "react";

import profileImage from "../images/default_profile.png";

const ProfilePage = () => {
  return (
    <main>
      <h1>Profile</h1>
      <div className="profileContent">
        <div className="profileUploadContaienr">
          <div className="profileImageContainer">
            <img src={profileImage} alt="Profile" />
          </div>

          <form action="">
            <input
              className="profileButton profileUploadButton"
              type="submit"
              value="Upload ⬆"
            />
          </form>
        </div>

        <div className="profileFormContainer">
          <form action="">
            <div className="twoForm">
              <div>
                <label for="fname">Name</label>
                <br />
                <input
                  className="inputField"
                  type="text"
                  name="fname"
                  value="John"
                />
              </div>

              <div>
                <label for="lname"></label>
                <br />
                <input
                  className="inputField"
                  required
                  type="text"
                  name="lname"
                  value="Doe"
                />
              </div>
            </div>

            <br />
            <br />

            <label for="email">Email</label>
            <br />
            <input
              className="inputField"
              required
              type="email"
              name="email"
              value="john.doe@gmail.com"
            />
            <br />
            <br />
            <br />

            <div className="threeForm">
              <div>
                <label for="cpassword">Update password</label>
                <br />
                <input
                  className="inputField"
                  type="password"
                  name="cpassword"
                  placeholder="Current password"
                />
              </div>

              <div>
                <label for="npassword"></label>
                <br />
                <input
                  className="inputField"
                  type="password"
                  name="npassword"
                  placeholder="New password"
                />
              </div>

              <div>
                <label for="rpassword"></label>
                <br />
                <input
                  className="inputField"
                  type="password"
                  name="rpassword"
                  placeholder="Reapeat new password"
                />
              </div>

              <br />
            </div>
            <input
              className="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </form>
          <button className="profileButton profileDeleteButton deleteButton">
            Delete profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
