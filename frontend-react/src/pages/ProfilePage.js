import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const ProfilePage = (props) => {
  const api = useAxios();
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const [uImageURL, setUImageURL] = useState("");
  const [uImage, setUImage] = useState();
  const [has2FA, setHas2FA] = useState(false);

  const [updated, setUpdated] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [subscriptions, setSubsciptions] = useState([]);
  const [ownCourses, setOwnCourses] = useState([]);

  const [deletePressed, setDelete] = useState(false);

  // handle get user data
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/user/${user.user_id}/`);

        setFName(response.data.fName);
        setLName(response.data.lName);
        setEmail(response.data.email);
        setUImageURL(response.data.userIMG);
        setHas2FA(response.data.has2FA);

        props.sendUpdateToHeader(response.data.userIMG);
      } catch {
        navigate("/login");
      }
    })();
  }, [uImageURL, uImage]);

  // patch user data
  const patchUser = async (e) => {
    e.preventDefault();

    const patchData = {
      fName: fName,
      lName: lName,
      email: email,
      has2FA: has2FA,
    };

    if (password !== "" || rpassword !== "") {
      if (password !== rpassword) {
        setErrorText("New password and repeated password must match");
        setUpdated(false);
        return;
      } else {
        patchData.password = password;
      }
    }

    try {
      await api.patch(`/user/${user.user_id}/`, patchData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUpdated(true);
    } catch {
      alert("Could not patch user");
      setUpdated(false);
    }

    setPassword("");
    setRPassword("");
    setErrorText("");
  };

  // delete user
  const deleteUser = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/user/${user.user_id}/`);
      logoutUser();
      navigate("/");
    } catch {
      alert("Could not delete user");
    }
  };

  // fetch subscriptions
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/subscriptions`);
        setSubsciptions(response.data);
        // console.log(response);
      } catch {}
    })();
  }, []);

  // own courses
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/courses/?owner=${user.user_id}`
      );
      const courses = await response.json();
      setOwnCourses(courses);
    })();
  }, []);

  // update image
  const handleImageChange = async (e) => {
    await api.patch(
      `/user/${user.user_id}/`,
      {
        userIMG: e.target.files[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setUImage(e.target.files[0]);
  };

  return (
    <main>
      <h1>Profile</h1>
      <div className="profileContent">
        <form onSubmit={patchUser}>
          <div className="profileUploadContaienr">
            <div className="profileImageContainer">
              <img src={uImageURL} alt="Profile" />
            </div>

            <input
              type="file"
              id="image"
              style={{ visibility: "hidden" }}
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleImageChange(e)}
            />
            <label
              htmlFor="image"
              className="profileButton profileUploadButton"
            >
              Upload ⬆
            </label>
          </div>

          <div className="profileFormContainer">
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

            <label htmlFor="2fa">2 Factor Authentication </label>
            <input
              className="checkboxField"
              type="checkbox"
              name="2fa"
              checked={has2FA}
              onChange={async (e) => setHas2FA(e.target.checked)}
            />

            <br />
            <br />

            <input
              className="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </div>
        </form>
      </div>

      {updated && <div className="successBox">Profile updated!</div>}
      {errorText !== "" && <div className="errorBox">{errorText}</div>}

      <br />

      <h2>Your Subscriptions</h2>
      {subscriptions.length !== 0 ? (
        <div className="threeCards">
          {subscriptions.map((subscription) => {
            return (
              <Link
                to={`/courses/${subscription.courseID}`}
                className="card courseCard"
                key={subscription.courseID}
              >
                <div>
                  <img src={subscription.courseIMG} alt="course" />
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
      ) : (
        <p>
          You have not subscribed to any courses
          <br />
          <br />
        </p>
      )}

      {user.is_staff && (
        <>
          <h2>Your Courses</h2>
          <br />
          <Link className="coursesSortButton" to={`/courses/create`}>
            Create new course
          </Link>
          <br />
          <br />
          <table className="adminTable">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Short description</th>
                <th>Like Ratio</th>
                <th>Edit</th>
              </tr>
              {ownCourses &&
                ownCourses.map((course) => {
                  return (
                    <tr key={course.courseID}>
                      <td>{course.courseID}</td>
                      <td>{course.courseName}</td>
                      <td>{course.shortDescription}</td>
                      <td>{`${course.likeRatio}%`}</td>
                      <td>
                        <Link to={`/courses/${course.courseID}/edit`}>
                          &#x270D;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <br />
          <br />
        </>
      )}

      <button
        className="profileButton profileDeleteButton deleteButton"
        onClick={() => setDelete(true)}
      >
        Delete profile
      </button>
      {deletePressed && (
        <div className="confirmBox">
          <p>Do you really want to delete your profile?</p>
          <button className="profileButton deleteButton" onClick={deleteUser}>
            Yes
          </button>
          <button
            className="profileButton profileUpdateButton"
            onClick={() => setDelete(false)}
          >
            No
          </button>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
