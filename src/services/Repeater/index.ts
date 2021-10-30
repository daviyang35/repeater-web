// 登录
import qs from "qs";
import request from "@/utils/request";

const login = async (data: { username: string; password: string }) => request.post("/token/login", qs.stringify(data), {
    headers: undefined,
});

export interface TrafficItem {
    id: number,
    appName: string,
    entranceDesc: string,
    traceId: string,
    host: string,
    gmtRecord: string,
    environment: string,
}

export interface RepeaterResponse<T> {
    success: string,
    message: string,
    count: number,
    totalPage: number,
    pageSize: number,
    pageIndex: number,
    data: T
}


const getOnline = (page: number = 1, size: number = 10): Promise<RepeaterResponse<TrafficItem[]>> => {
    return new Promise(((resolve, reject) => {
        request.get("/online/", {
            page: page, size: size,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            console.log("getOnline catch", err);
            reject(err);
        });
    }));
};

const getModule = (page: number = 1, size: number = 10): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/module/", {
            page: page, size: size,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const repeaterApi = {
    login,
    getOnline,
    getModule,
};

export default repeaterApi;
