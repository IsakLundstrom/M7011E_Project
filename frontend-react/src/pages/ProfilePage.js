import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const ProfilePage = () => {
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
      } catch {
        navigate("/login");
      }
    })();
  }, [uImageURL, uImage]);

  // patch user data
  const patchUser = async (e) => {
    e.preventDefault();

    if (password !== "" || rpassword !== "") {
      if (password !== rpassword) {
        setErrorText("New password and repeated password must match");
      } else {
        try {
          await api.patch(`/changePassword/`, { newPassword: password });
          setErrorText("");
        } catch {
          alert("Could not patch password");
        }
      }
    }

    try {
      await api.patch(
        `/user/${user.user_id}/`,
        {
          fName: fName,
          lName: lName,
          email: email,
          userIMG: uImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch {
      alert("Could not patch user");
    }

    setPassword("");
    setRPassword("");
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
            <input
              className="profileButton profileUpdateButton"
              type="submit"
              value="Update profile"
            />
          </div>
        </form>
      </div>

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
