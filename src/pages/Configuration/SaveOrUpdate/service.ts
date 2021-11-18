import request from "@/utils/request";

interface SaveOrUpdateParams {
    appName: string;
    environment: string;
    config: string;
}

const getModuleConfig = (appName: string, environment: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/config/detail", {
            appName: appName,
            environment: environment,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const saveOrUpdate = (params: SaveOrUpdateParams): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/config/saveOrUpdate", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {
    getModuleConfig,
    saveOrUpdate,
};

export default service;
