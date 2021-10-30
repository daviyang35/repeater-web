import request from "@/utils/request";

const getModuleConfig = (appName: string, environment: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/config/detail", {
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
};
