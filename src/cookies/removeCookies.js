import Cookies from "js-cookie";
export default function removeCookie(cookiename) {
  Cookies.remove(cookiename);
}