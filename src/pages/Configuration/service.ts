import request from "@/utils/request";

export interface ConfigParams extends Pagination {
    appName?: string;
    environment?: string;
}

const getModuleConfig = (params: ConfigParams): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/config/", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const pushConfig = (appName: string, environment: string): Promise<any> => {
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

const deleteConfig = (id: number): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.delete("/config/" + id).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const updateConfig = (params: any): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.put("/config/" + params.id).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {
    getModuleConfig,
    pushConfig,
    deleteConfig,
    updateConfig,
};

export default service;


