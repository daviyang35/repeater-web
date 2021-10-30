/**
 * 新增用户
 * @param data 用户参数
 * @returns
 */
import request from "@/utils/request";

const add = async (data: {
    // 姓名
    name: string,
    // 性别
    sex?: string,
    // 手机号码
    mobile?: string,
    // 账号
    username: string,
    // 密码
    password: string,
    // 所属机构ID
    deptId: number,
    // 管理机构ID集合
    deptScope: number[],
    // 角色ID集合
    roleScope: number[],
}) => request.post("/user/add", data);

/**
 * 编辑用户
 * @param data 用户参数
 * @returns
 */
const edit = async (data: {
    id: number,
    // 姓名
    name: string,
    // 性别
    sex?: string,
    // 手机号码
    mobile?: string,
    // 账号
    username: string,
    // 密码
    password: string,
    // 所属机构ID
    deptId: number,
    // 管理机构ID集合
    deptScope: number[],
    // 角色ID集合
    roleScope: number[],
}) => request.post("/user/edit", data);

/**
 * 删除
 * @param id 用户ID
 * @returns
 */
const del = async (id: number) => request.post("/user/delete", {id});

/**
 * 获取list
 * @param params 搜索参数
 * @returns
 */
const getList = async (params: {
    deptId?: string,
    page: number,
    size: number
}) => request.get("/user/listByPage", params);

/**
 * 获取用户详情
 * @param id 用户ID
 * @returns
 */
const getDetail = async (id: number) => request.get("/user/details", {id});

const examinationApi = {
    add,
    edit,
    del,
    getList,
    getDetail,
};

export default examinationApi;
