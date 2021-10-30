/* eslint-disable no-param-reassign */
import routes from "@/route/routes";
import Error403 from "@/pages/Error/403";

type CommonObjectType<T = any> = Record<string, T>

/**
 * 隐藏手机号码
 * @param {string} phone 手机号
 */
export const hidePhone = (phone: string) =>
    phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");

/**
 * 以递归的方式展平react router数组
 * @param {object[]} arr 路由数组
 */
export const flattenRoutes = (arr: any[]) => {
    let newRouter: any = [];
    arr.forEach(item => {
        newRouter.push(item);
        if (Array.isArray(item.children) && item.children.length > 0) {
            item.children.forEach((obj: any) => obj.parentPath = item.path);
            newRouter = newRouter.concat(flattenRoutes(item.children));
        }
    });
    return newRouter;
};

/**
 * 根据路径获取路由的name和key
 * @param {string} path 路由
 */
export const getKeyName = (path: string = "/403") => {
    const curRoute = flattenRoutes(routes).find((item: any) => item.path.startsWith(path));
    if (!curRoute) {
        return {title: "暂无权限", path: "/403", key: "/403", component: Error403};
    }
    return curRoute;
};

/**
 * 同步执行操作，Currying
 * @param {*} action 要执行的操作
 * @param {function} cb 下一步操作回调
 */
export const asyncAction = (action: unknown) => {
    const wait = new Promise((resolve) => {
        resolve(action);
    });
    return (cb: () => void) => {
        wait.then(() => setTimeout(() => cb()));
    };
};

/**
 * 获取地址栏 ?参数，返回键值对对象
 */
export const getQuery = (): CommonObjectType<string> => {
    const {href} = window.location;
    const query = href.split("?");
    if (!query[1]) return {};

    const queryArr = decodeURI(query[1]).split("&");
    const queryObj = queryArr.reduce((prev, next) => {
        const item = next.split("=");
        return {...prev, [item[0]]: item[1]};
    }, {});
    return queryObj;
};

/**
 * 获取本地存储中的权限
 */
export const getPermission = (): any => localStorage.getItem("permissions") || [];

/**
 * 根据权限判断是否有权限
 */
export const isAuthorized = (val: any): boolean => {
    const permissions = getPermission();
    return permissions.includes(val);
};

/**
 * 用requestAnimationFrame替代setTimeout、setInterval，解决内存溢出
 * @export
 * @param {*} cb 定时回调
 * @param {*} interval 定时时间
 */
export const customizeTimer = {
    intervalTimer: 0,
    timeoutTimer: 0,
    setTimeout(cb: () => void, interval: number) {
        // 实现setTimeout功能
        const {now} = Date;
        const stime = now();
        let etime = stime;
        const loop = () => {
            this.timeoutTimer = requestAnimationFrame(loop);
            etime = now();
            if (etime - stime >= interval) {
                cb();
                cancelAnimationFrame(this.timeoutTimer);
            }
        };
        this.timeoutTimer = requestAnimationFrame(loop);
        return this.timeoutTimer;
    },
    clearTimeout() {
        cancelAnimationFrame(this.timeoutTimer);
    },
    setInterval(cb: () => void, interval: number) {
        // 实现setInterval功能
        const {now} = Date;
        let stime = now();
        let etime = stime;
        const loop = () => {
            this.intervalTimer = requestAnimationFrame(loop);
            etime = now();
            if (etime - stime >= interval) {
                stime = now();
                etime = stime;
                cb();
            }
        };
        this.intervalTimer = requestAnimationFrame(loop);
        return this.intervalTimer;
    },
    clearInterval() {
        cancelAnimationFrame(this.intervalTimer);
    },
};


/**
 * 检查权限
 */
export const checkAuth = (newPathname: string): boolean => {
    const noCheckAuth = ["/", "/403"]; // 不需要检查权限的页面
    // 不需要检查权限的
    if (noCheckAuth.includes(newPathname)) {
        return true;
    }
    const {tabKey} = getKeyName(newPathname);
    return isAuthorized(tabKey);
};
