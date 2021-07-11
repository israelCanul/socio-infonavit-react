import axios from "axios";
import { apiUrl } from "../helpers/config";
import {
  setStorageItem,
  getStorageItem,
  setCookie,
  removeStorageItem,
} from "../helpers/index";

export const tryLogin = (email, pass) => {
  return axios
    .post(apiUrl + "/login", {
      user: {
        email: email,
        password: pass,
      },
    })
    .then(function (response) {
      setStorageItem("dataLogin", response.data);
      setStorageItem("headerLogin", response.headers);
      return { error: 0, data: response.data, headers: response.headers };
    })
    .catch(function (error) {
      console.dir(error);
      if (error.response.data) {
        return { error: -1, data: error.response.data.error };
      } else {
        return { error: -2, data: error.message };
      }
    });
};
export const getWallets = (headersInfo) => {
  return axios.get(apiUrl + "/member/wallets", {
    headers: headersInfo,
  });
};

export const getBenevits = (headersInfo) => {
  return axios.get(apiUrl + "/member/landing_benevits", {
    headers: headersInfo,
  });
};

export const tryLogout = () => {
  return axios
    .delete(apiUrl + "/logout", { headers: getStorageItem("headerLogin") })
    .then(function (response) {
      removeStorageItem("dataLogin", null);
      removeStorageItem("headerLogin", null);
      setCookie("dataLogin", "", -2);
      return { error: 0, data: null };
    })
    .catch(function (error) {
      removeStorageItem("dataLogin", null);
      removeStorageItem("headerLogin", null);
      setCookie("dataLogin", "", -2);
      if (error.response.data) {
        return { error: 0, data: null };
      } else {
        return { error: 0, data: null };
      }
    });
};
