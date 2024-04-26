import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "./utils";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
});

export const axiosInstanceNoInterceptor = axios.create({
    baseURL: "http://localhost:3001/",
});

axiosInstance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log(jwtDecode(token))

    if (!token || !refreshToken) return req;

    const isExpired = isTokenValid(token);

    // tu vada ar gasvlis
    if (!isExpired) {
        req.headers.Authorization = `Bearer ${token}`;
        return req
    }

    // tu tokens vada gauvida

    const { data } = await axios.post(
        "http://localhost:3001/users/refresh",
        {
            refresh_token: refreshToken,
        }
    );

    // axali tokeni
    const newAccessToken = data.token
    localStorage.setItem("token", newAccessToken);

    // new access token davsetot hederebshi

    req.headers.Authorization = `Bearer ${newAccessToken}`;

    return req

});