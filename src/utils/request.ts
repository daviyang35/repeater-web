/// reference types='axios'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {message as $message} from "antd";
import config from "@/config";

export class Request {
    private baseConfig: AxiosRequestConfig = {
        baseURL: config.domain,
        timeout: 1000 * 120,
        // withCredentials: true,
        headers: {},
    };

    // axios 实例
    public instance: AxiosInstance = axios.create(this.baseConfig);


    public constructor() {
        this.setReqInterceptors();
        this.setRespInterceptors();
    }

    // 设置请求头
    public setHeader = (headers: any) => {
        this.baseConfig.headers = {...this.baseConfig.headers, ...headers};
        this.instance = axios.create(this.baseConfig);
        this.setReqInterceptors();
        this.setRespInterceptors();
    };

    // get请求
    public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
        this.instance({
            ...{url, method: "get", params: data},
            ...config,
        });

    // post请求
    public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
        this.instance({
            ...{url, method: "post", data},
            ...config,
        });

    // 不经过统一的axios实例的get请求
    public postOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        axios({
            ...this.baseConfig,
            ...{url, method: "post", data},
            ...config,
        });

    // 不经过统一的axios实例的post请求
    public getOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        axios({
            ...this.baseConfig,
            ...{url, method: "get", params: data},
            ...config,
        });

    // delete请求,后端通过requestBody接收
    public deleteBody = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        this.instance({
            ...{url, method: "delete", data},
            ...config,
        });

    // delete请求,后端通过后端通过requestParam接收
    public deleteParam = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
        this.instance({
            ...{url, method: "delete", params: data},
            ...config,
        });

    // 请求拦截器
    private setReqInterceptors = () => {
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
                if (config === undefined) {
                    return config;
                }
                if ((config.params && config.params.noToken) || (config.data && config.data.noToken)) {
                    return config;
                }
                if (config.headers) {
                    config.headers.Authorization = localStorage.getItem("token") || "";
                }
                return config;
            },
            err => {
                void $message.error("请求失败:" + err);
                return Promise.reject(err);
            },
        );
    };
    // 响应拦截器
    private setRespInterceptors = () => {
        this.instance.interceptors.response.use(
            async (res: AxiosResponse) => {
                if (res.config.responseType === "blob") {
                    let msg = "";
                    try {
                        const json: any = JSON.parse(await (res.data as Blob).text());
                        if (json.code !== 0) {
                            msg = json.msg;
                        }
                    } catch (error) {
                    }
                    if (msg) {
                        $message.error(msg);
                        return Promise.reject(res);
                    }
                    return Promise.resolve(res);
                }

                const {success, message} = res.data;
                if (success === true) {
                    return Promise.resolve(res.data);
                }
                $message.error(message || "网络错误，请稍后再试。");
                return Promise.reject(res);
            },
            async err => {
                const {data = {}, config = {}, status} = err.response || {};
                if (status === 401) {
                    setTimeout(() => {
                        window.location.replace("/#/login");
                    }, 1000);
                }
                let {msg = ""} = data;
                if (config.responseType === "blob") {
                    if (data.type === "application/json") {
                        try {
                            const json: any = JSON.parse(await data.text());
                            msg = json.msg;
                        } catch (error) {
                        }
                    }
                }
                $message.destroy();
                $message.error(msg || err.message || "请求失败，请重试");
                return Promise.reject(err);
            },
        );
    };
}

let request: Request = new Request();

export default request;
