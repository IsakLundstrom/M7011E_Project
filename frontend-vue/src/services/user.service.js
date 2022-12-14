import api from './api';

class UserService {
  getCourses(ordering, search) {
    return api.get(`courses/?ordering=${ordering}&search=${search}`);
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
}

export default new UserService();