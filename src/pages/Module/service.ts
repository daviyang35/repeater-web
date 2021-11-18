import request from "@/utils/request";
import {InstallModalParams} from "@/pages/Module/InstallModal/InstallModal";

export interface ModuleParams extends Pagination {
    appName?: string;
    ip?: string;
}

const getModule = (params: ModuleParams): Promise<any> => {
    return new Promise(((resolve, reject) =>
        request.get("/module/", params)
            .then(response => resolve(response))
            .catch(err => reject(err))));
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

const active = (appName: string, ip: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/module/active", {
            appName: appName, ip: ip,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const reload = (appName: string, environment: string, ip: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/module/reload", {
            appName: appName, environment: environment, ip: ip,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const del = (id: number): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.delete("/module/" + id).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const install = (params: InstallModalParams): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.post("/module/install", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {
    getModule,
    frozen,
    active,
    reload,
    install,
    del,
};
export default service;
