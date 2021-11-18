import request from "@/utils/request";

export interface ReplayResultParams {
    appName: string;
    repeatId: string;
}

export interface RecordDetailBO {

}

export interface MockInvocationBO {

}

export interface DifferenceBO {

}

export interface ReplayResultVO {
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

    record?: RecordDetailBO;
    mockInvocations?: MockInvocationBO[];
    differences?: DifferenceBO[];
}

const replayResult = (params: ReplayResultParams): Promise<RepeaterResult<ReplayResultVO>> => {
    return new Promise(((resolve, reject) => {
        request.get("/replay/detail", params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};

const service = {replayResult};

export default service;
