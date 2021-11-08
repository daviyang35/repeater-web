import request from "@/utils/request";

const slogan = (): Promise<string> => {
    return new Promise(((resolve, reject) => {
        request.get("/regress/slogan")
            .then(response => {
                resolve(response);
            }).catch(err => {
            reject(err);
        });
    }));
};

const repeater3 = (): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/regress/get/repeater/3")
            .then(response => {
                resolve(response);
            }).catch(err => {
            reject(err);
        });
    }));
};

const getWithCache = (): Promise<any> => {
    return new Promise(((resolve, reject) => {
        request.get("/regress/getWithCache/repeater")
            .then(response => {
                resolve(response);
            }).catch(err => {
            reject(err);
        });
    }));
};

const service = {
    slogan,
    repeater3,
    getWithCache,
};

export default service;
