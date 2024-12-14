import getCookie from "../cookies/getCookies";

export const getUserDetails = () => {
  if (getCookie("sessionData")) return JSON.parse(getCookie("sessionData"));
  else return false;
};
