/**
 * 新增部门
 * @param data 部门参数
 * @returns
 */
import request from "@/utils/request";

const add = async (data: {
    name: string,
    code?: string,
    parentId?: number,
    cars?: string[],
    schools?: string[],
    examSites?: string[],
}) => request.post("/dept/add", data);

/**
 * 编辑部门
 * @param data 部门参数
 * @returns
 */
const edit = async (data: {
    id: number,
    name: string,
    code?: string,
    parentId?: number,
    cars?: string[],
    schools?: string[],
    examSites?: string[],
    updateSub?: boolean,
}) => request.post("/dept/edit", data);

/**
 * 删除
 * @param id 部门ID
 * @returns
 */
const del = async (id: number) => request.post("/dept/delete", {id});

/**
 * 获取list
 * @param params 搜索参数
 * @returns
 */
const getList = async (params: { name?: string, }) => request.get("/dept/tree", params);

/**
 * 获取部门详情
 * @param id 部门ID
 * @returns
 */
const getDetail = async (id: number) => request.get("/dept/details", {id});

const examinationApi = {
    add,
    edit,
    del,
    getList,
    getDetail,
};

export default examinationApi;
