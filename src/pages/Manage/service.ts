import request from "@/utils/request";

export const getModuleConfig = (): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/config/").then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

export const pushConfig = (appName: string, environment: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/config/push", {
            appName: appName,
            environment: environment,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

export default {
    getModuleConfig,
    pushConfig,
};


