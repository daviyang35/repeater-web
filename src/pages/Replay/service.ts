import request from "@/utils/request";

export interface ReplayParams extends Pagination {
    appName?: string;
    environment?: string;
}

export interface ReplayVO {
    id: number,
    appName: string,
    ip: string,
    environment: string,
    repeatId: string,
    status: string,
    traceId?: string,
    response?: string,
    success?: boolean,
    cost?: number,
    mockInvocations?: any,
    differences?: any,
}

const replay = (params: ReplayParams): Promise<PageResult<ReplayVO>> => {
    return new Promise(((resolve, reject) => {
        request.get("/replay/", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {replay};

export default service;
