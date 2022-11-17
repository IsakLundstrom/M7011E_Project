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
                  className="profileInputField"
                  type="text"
                  id="fname"
                  name="fname"
                  value="John"
                />
              </div>
              <div>
                <label for="lname"></label>
                <br />
                <input
                  className="profileInputField"
                  required
                  type="text"
                  id="lname"
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
              className="profileInputField"
              required
              type="email"
              id="fname"
              name="email"
              value="john.doe@gmail.com"
            />
            <br />
            <br />
            <br />

            <div className="twoForm">
              <div>
                <label for="cpassword">Update password</label>
                <br />
                <input
                  className="profileInputField"
                  type="password"
                  id="fname"
                  name="cpassword"
                  placeholder="Current password"
                />
              </div>
              <div>
                <label for="npassword"></label>
                <br />
                <input
                  className="profileInputField"
                  type="password"
                  id="npassword"
                  name="lname"
                  placeholder="New password"
                />
              </div>
              <br />
            </div>
            <input
              className="profileButton profileUpdateButton"
              type="submit"
              value="Update"
            />
          </form>
          <button className="profileButton profileDeleteButton">
            Delete profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
