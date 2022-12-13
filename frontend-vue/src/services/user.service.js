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
}

export default new UserService();