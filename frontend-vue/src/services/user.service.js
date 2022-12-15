import api from './api';

class UserService {
  getCourses(ordering, search) {
    return api.get(`courses/?ordering=${ordering}&search=${search}`);
  }

  getCourse(courseID){
    return api.get(`http://127.0.0.1:8000/courses/${courseID}/`);
  }

  getCourseVideos(courseID) {
    return api.get(`http://127.0.0.1:8000/courses/${courseID}/videos/`);
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

  //1 = like, 0 = dislike
  putLikeValue(courseID, userID, likeID, value){
    return api.put(`courses/${courseID}/likes/${likeID}/`, {
      userID: userID,
      courseID: courseID,
      like: value,
    });
  }
}

export default new UserService();