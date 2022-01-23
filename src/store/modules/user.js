import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import Vue from "vue";

const getDefaultState = () => {
  return {
    token: getToken(),
    username: "",
    mobile: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, username) => {
    state.username = username;
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          commit("SET_NAME", data.username);
          commit("SET_MOBILE", data.mobile);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  // async getInfo({ commit, state }) {
  //   try {
  //     const res = await getInfo(state.token);
  //     commit("SET_NAME", res.username);
  //     commit("SET_MOBILE", res.mobile);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  // user logout
  async Logout({ commit, state }) {
    try {
      await logout();
      removeToken();
      commit("RESET_STATE");
      resetRouter();
    } catch (e) {
      console.error(e);
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
