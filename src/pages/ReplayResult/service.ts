import request from "@/utils/request";

export interface ReplayResultParams {
    appName: string;
    repeatId: string;
}

export interface RecordDetailBO {
    request: string;
    response: string;
    subInvocations: string;
    id: number;
    gmtCreate: string;
    gmtRecord: string;
    appName: string;
    environment: string;
    host: string;
    traceId: string;
    entranceDesc: string;
}

export interface MockInvocationBO {
    index: number;
    success: boolean;
    skip: boolean;
    cost: number;
    originUri: string;
    currentUri: string;
    originArgs: string;
    currentArgs: string;
}

export interface DifferenceBO {
    nodeName: string;
    actual: string;
    expect: string;
    type: string;
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
    gmtCreate?: string;

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
