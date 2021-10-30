// 获取用户菜单
import request from "@/utils/request";

const getMenu = async (id: string) => request.get("/menu/" + id);

// 当前登录用户
const userScope = async () => request.get("/account/userScope");

// 当前登录用户角色
const roleScope = async () => request.get("/account/roleScope");

/**
 * 当前登录用户数据权限
 * @param params 当前需要科目
 * @returns
 */
const dataScope = async (params: { subjects: number }) => request.get("/account/dataScope", params);

// 当前登录用户部门树
const deptScope = async () => request.get("/account/deptScope");


const accountApi = {
    getMenu,
    userScope,
    roleScope,
    dataScope,
    deptScope,
};

export default accountApi;
