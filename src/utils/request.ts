/// reference types='axios'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
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

    // delete 请求
    public delete = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
        this.instance({
            ...{url, method: "delete", data},
            ...config,
        });

    // put 请求
    public put = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
        this.instance({
            ...{url, method: "put", data},
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

    };
    // 响应拦截器
    private setRespInterceptors = () => {
        this.instance.interceptors.response.use(
            async (res: AxiosResponse) => {
                return Promise.resolve(res.data);
            },
            async err => {
                return Promise.reject(err);
            },
        );
    };
}

let request: Request = new Request();

export default request;
