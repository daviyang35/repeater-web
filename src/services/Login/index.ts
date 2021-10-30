import qs from "qs";
import request from "@/utils/request";

// 登录
const login = async (data: { username: string; password: string }) => request.post("/token/login", qs.stringify(data), {
    headers: undefined,
});

// 静默登录
const quietLogin = async (username: string) => request.get("/account/login?username=" + username + "&source=cq", undefined, {
    headers: undefined,
});

const accountApi = {
    login,
    quietLogin,
};

export default accountApi;
