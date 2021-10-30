/**
 * 新增角色
 * @param data 角色参数
 * @returns
 */
import request from "@/utils/request";

const add = async (data: {
    name: string,
    remarks?: string,
    menuIds: number[],
}) => request.post("/role/add", data);

/**
 * 编辑角色
 * @param data 角色参数
 * @returns
 */
const edit = async (data: {
    id: number,
    name: string,
    remarks?: string,
    menuIds: number[],
}) => request.post("/role/edit", data);

/**
 * 删除
 * @param id 角色ID
 * @returns
 */
const del = async (id: number) => request.post("/role/delete", {id: id});

/**
 * 获取list
 * @param params 搜索参数
 * @returns
 */
const getList = async (params: {
    name?: string,
    page: number,
    size: number
}) => request.get("/role/listByPage", params);

/**
 * 获取角色详情
 * @param id 角色ID
 * @returns
 */
const getDetail = async (id: number) => request.get(`/role/details?id=${id}`);

/**
 * 当前登录用户菜单树
 * @returns
 */
const accountMenu = async () => request.get("/account/menu");

const examinationApi = {
    add,
    edit,
    del,
    getList,
    getDetail,
    accountMenu,
};

export default examinationApi;
