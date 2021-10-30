import request from "@/utils/request";

export const getTrafficDetails = (traceId: string, appName: string): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/online/details", {
            traceId: traceId, appName: appName,
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    }));
};


