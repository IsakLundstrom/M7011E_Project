import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },

    login2fa({ commit }, user) {
      return AuthService.login2fa(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      )
    },

    resetPassword({ commit }, user) {
      return AuthService.resetPassword(user).then(
        user => {
          commit('resetPasswordSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('resetPasswordFailure');
          return Promise.reject(error);
        }
      )
    },

    resetPasswordConfirm({ commit }, user) {
      return AuthService.resetPasswordConfirm(user).then(
        user => {
          commit('resetPasswordConfirmSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('resetPasswordConfirmFailure');
          return Promise.reject(error);
        }
      )
    },

    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }, 
    refreshToken({ commit }, access) {
      commit('refreshToken', access);
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, access: accessToken };
    },
  }
};