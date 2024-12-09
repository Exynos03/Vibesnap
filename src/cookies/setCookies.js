import Cookies from "js-cookie";
export default function setCookie(cookiename, value, expiry) {
  let options = {
    expires: expiry ? expiry : 1,
    secure: false,
    sameSite: "Lax",
  };
  if (window.location.protocol === "https:") {
    options.secure = true;
    options.sameSite = "None";
  }
  return Cookies.set(cookiename, value, options);
}
