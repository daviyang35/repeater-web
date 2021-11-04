import request from "@/utils/request";

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

const frozen = (appName: string, ip: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/module/frozen", {
            appName: appName, ip: ip,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const reload = (appName: string, ip: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/module/reload", {
            appName: appName, ip: ip,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {
    getModule,
    frozen,
    reload,
};
export default service;
