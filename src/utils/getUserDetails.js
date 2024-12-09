import getCookie from "../cookies/getCookies"

 export const getUserDetails = () => {
    return JSON.parse(getCookie("sessionData"))
 }