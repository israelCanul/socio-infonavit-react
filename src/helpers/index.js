import { Base64 } from "js-base64";
export function setCookie(cname, cvalue, exHour) {
  var d = new Date();
  d.setTime(d.getTime() + exHour * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const setStorageItem = (name, item) => {
  let vName = name;
  setCookie(name, name, 1);
  try {
    localStorage.removeItem(vName);
    localStorage.setItem(vName, Base64.encode(JSON.stringify(item)));
  } catch (e) {
    console.log(e);
  }
};
export const getStorageItem = (name) => {
  let Item = "";
  let vName = name;

  if (localStorage.getItem(vName) != null) {
    Item = JSON.parse(Base64.decode(localStorage.getItem(vName)));
  }
  return Item;
};
export const removeStorageItem = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (e) {
    console.log(e);
  }
};

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
