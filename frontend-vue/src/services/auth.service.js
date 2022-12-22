import api from "./api";
import TokenService from "./token.service";

class AuthService {
    async login({email, password }) {
      return api
        .post('auth/login/', {
          email,
          password
        })
        .then(response => {
          if (response.data.access) {
            TokenService.setUser(response.data);
          }
          return response.data;
        });
    }

    async login2fa({email, password, token}) {
      return api.post('auth/login/2fa/', {
        email,
        password,
        token
      })
      .then(response => {
        if (response.data.access) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
    }

    async resetPassword({email}) {
      return api.post('auth/resetPassword/', {
        email,
        port: 8080,
      })
    }

    async resetPasswordConfirm({password, uID, token}) {
      return api.post(`auth/resetPasswordConfirm/`, {
        password,
        uID,
        token,
      })
    }
  
    logout() {
      TokenService.removeUser();
    }
  
    register({ fName, lName, email, password }) {
      return api.post('register/', {
        fName,
        lName,
        email,
        password
      });
    }
  }
  
  export default new AuthService();