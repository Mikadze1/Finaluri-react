import { jwtDecode } from "jwt-decode"


export const isUserAdmin = (user) => {
    if (!user) return false;
    return user.role.includes("admin");
};


export const isTokenValid = (token) => {
    const expirationDate = jwtDecode(token).exp;

    const isExpired = expirationDate * 1000 < new Date().getTime();

    return isExpired
}