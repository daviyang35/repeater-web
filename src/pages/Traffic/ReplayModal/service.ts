import request from "@/utils/request";

export interface ModuleInfo {
    id: number;
    gmtCreate: string;
    gmtModified: string;
    appName: string;
    environment: string;
    ip: string;
    port: number;
    version: string;
    status: string;
}

const replayServer = (appName: string): Promise<PageResult<ModuleInfo>> => {
    return new Promise(((resolve, reject) => {
        request.get("/module/byName.json", {appName}).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

export interface ExecuteReplayParams {
    appName: string;
    environment: string;
    traceId: string;
    mock: boolean;
    ip: string;
}

const executeReplay = (params: ExecuteReplayParams): Promise<PageResult<ModuleInfo>> => {
    return new Promise(((resolve, reject) => {
        request.post("/replay/execute", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {replayServer, executeReplay};

export default service;
