import api from './api';

class UserService {
  getCourses() {
    return api.get('courses/');
  }

  getUserList() {
    return api.get('user/');
  }

  getProfile(id) {
    return api.get('user/' + id + '/');
  }
}

export default new UserService();