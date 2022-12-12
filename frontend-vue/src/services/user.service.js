import api from './api';

class UserService {
  getCourses() {
    return api.get('courses/');
  }

  getUserList() {
    return api.get('user/');
  }
}

export default new UserService();