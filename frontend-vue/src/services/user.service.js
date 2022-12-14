import api from './api';

class UserService {
  getCourses(ordering, search) {
    return api.get(`courses/?ordering=${ordering}&search=${search}`);
  }

  getCoursesFromOwner(OwnerID) {
    return api.get(`courses/?owner=${OwnerID}`);
  }

  postCourse(courseName, shortDesc, longDesc, courseIMG) {
    return api.post("/courses/", {
      courseName: courseName,
      shortDescription: shortDesc,
      longDescription: longDesc,
      courseIMG: courseIMG,
    });
  }

  getCourse(courseID) {
    return api.get(`http://127.0.0.1:8000/courses/${courseID}/`);
  }

  patchCourse(courseID, courseName, shortDesc, longDesc, courseIMG) {
    return api.patch(`http://127.0.0.1:8000/courses/${courseID}/`, {
      courseName: courseName,
      shortDescription: shortDesc,
      longDescription: longDesc,
      courseIMG: courseIMG,
    });
  }

  deleteCourse(courseID) {
    return api.delete(`/courses/${courseID}/`);
  }

  getCourseVideos(courseID) {
    return api.get(`http://127.0.0.1:8000/courses/${courseID}/videos/`);
  }

  postCourseVideo(courseID, videoName, videoURL) {
    return api.post(`/courses/${courseID}/videos/`, {
      courseID: courseID,
      videoName: videoName,
      videoURL: videoURL,
    })
  }

  deleteCourseVideo(courseID, videoID) {
    return api.delete(`/courses/${courseID}/videos/${videoID}/`);

  }

  getUserList() {
    return api.get('user/');
  }

  getProfile(id) {
    return api.get('user/' + id + '/');
  }

  getSubscriptions() {
    return api.get('subscriptions/');
  }

  getSubscribeData(courseID, userID){
    return api.get(`courses/${courseID}/subscriptions/${userID}/`);
  }

  postSubscribe(courseID, userID) {
    return api.post(`courses/${courseID}/subscriptions/`, {
      userID: userID,
      courseID: courseID,
    });
  }

  deleteSubscribe(courseID, subID) {
    return api.delete(`courses/${courseID}/subscriptions/${subID}/`);
  }

  getLikeValue(courseID, userID) {
    return api.get(
      `courses/${courseID}/likes/${userID}`
    );
  }

  //1 = like, 0 = dislike
  postLikeValue(courseID, userID, value) {
    return api.post(`courses/${courseID}/likes/`, {
      userID: userID,
      courseID: courseID,
      like: value,
    });
  }

  postRegisterProfile(fName, lName, email, password) {
    return api.post("http://localhost:8000/auth/register/", {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
    });
  }

  //1 = like, 0 = dislike
  putLikeValue(courseID, userID, likeID, value){
    return api.put(`courses/${courseID}/likes/${likeID}/`, {
      userID: userID,
      courseID: courseID,
      like: value,
    });
  }

  getUserList(){
    return api.get("/user/");
  }

  getUser(userID) {
    return api.get(`/user/${userID}/`);
  }

  patchUser(userID, fName, lName, email, has2FA) {
    return api.patch(`/user/${userID}/`, {
      fName: fName,
      lName: lName,
      email: email,
      has2FA: has2FA,
    });
  }

  patchUpdateUser(userID, fName, lName, email, is_staff, is_superuser) {
    return api.patch(`/user/${userID}/`, {
      fName: fName,
      lName: lName,
      email: email,
      is_staff: is_staff,
      is_superuser: is_superuser,
    });
  }

  patchUserImage(userID, image) {
    return api.patch(`/user/${userID}/`,
      {
        userIMG: image,
      },
    );
  }

  patchPassword(userID, newPassword) {
    return api.patch(`/user/${userID}/`, {
      password: newPassword,
    });
  }

  deleteUser(userID) {
    return api.delete(`/user/${userID}/`);
  }
}

export default new UserService();