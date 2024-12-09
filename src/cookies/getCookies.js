import Cookies from "js-cookie";
export default function getCookie(cookiename) {
  return Cookies.get(cookiename);
}