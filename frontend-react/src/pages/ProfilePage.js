import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

import homeImage from "../images/home_image.png";
import profileImage from "../images/default_profile.png";

const ProfilePage = () => {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");

  const [subscriptions, setSubsciptions] = useState([]);

  // handle get user data
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/user/${user.user_id}/`);
        setFName(response.data.fName);
        setLName(response.data.lName);
        setEmail(response.data.email);
      } catch {
        navigate("/login");
      }
    })();
  }, []);

  // patch user data
  const patchUser = async (e) => {
    e.preventDefault();

    if (password !== "") {
      try {
        await api.patch(`/changePassword/`, { newPassword: password });
      } catch {
        alert("Could not patch password");
      }
    }

    try {
      await api.patch(`/user/${user.user_id}/`, {
        fName: fName,
        lName: lName,
        email: email,
      });
    } catch {
      alert("Could not patch user");
    }

    setPassword("");
    setRPassword("");
  };

  // handle fetch subscriptions
  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/courses/");
      const parsed = await response.json();
      setSubsciptions(parsed);
    })();
  }, []);

  return (
    <main>
      <h1>Profile</h1>
      <div className="profileContent">
        <div className="profileUploadContaienr">
          <div className="profileImageContainer">
            <img src={profileImage} alt="Profile" />
          </div>

          <form>
            <input
              className="profileButton profileUploadButton"
              type="submit"
              value="Upload ⬆"
            />
          </form>
        </div>

        <div className="profileFormContainer">
          <form onSubmit={patchUser}>
            <div className="twoForm">
              <div>
                <label htmlFor="fname">Name</label>
                <br />
                <input
                  className="inputField"
                  type="text"
                  name="fname"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="lname"></label>
                <br />
                <input
                  className="inputField"
                  required
                  type="text"
                  name="lname"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
            </div>

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
            <br />

            <div className="twoForm">
              <div>
                <label htmlFor="npassword">Password</label>
                <br />
                <input
                  className="inputField"
                  type="password"
                  name="npassword"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="rpassword"></label>
                <br />
                <input
                  className="inputField"
                  type="password"
                  name="rpassword"
                  placeholder="Reapeat new password"
                  value={rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
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
        </div>
      </div>

      <br />

      <h2>Subscriptions</h2>
      <div className="threeCards">
        {subscriptions &&
          subscriptions.map((subscription) => {
            return (
              <Link
                to={`/courses/${subscription.courseID}`}
                className="card courseCard"
                key={subscription.courseID}
              >
                <div>
                  <img src={homeImage} alt="course" />
                  <div className="cardTextContainer">
                    <h3>
                      <b>{subscription.courseName} </b>
                    </h3>
                    <p>{subscription.shortDescription}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      <button className="profileButton profileDeleteButton deleteButton">
        Delete profile
      </button>
    </main>
  );
};

export default ProfilePage;
