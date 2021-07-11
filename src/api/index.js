import axios from "axios";
import { apiUrl } from "../helpers/config";
import { setStorageItem } from "../helpers/index";

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
