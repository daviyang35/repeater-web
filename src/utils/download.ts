import {message} from "antd";
import request from "@/utils/request";

type MsSaveOrOpenBlob = (blob: any, defaultName?: string | undefined) => boolean;

interface NavigatorWithMsSaveOrOpenBlob extends Navigator {
    msSaveOrOpenBlob: MsSaveOrOpenBlob;
}

interface exportOptions {
    url: string;// url路径
    params: any,
    fileName: string,
}

export const downloadFile = (opts: exportOptions) => {
    const {url, params, fileName} = opts;
    const result = request.get(url, params, {
        responseType: "blob",
    });
    result.then(async res => {
        const blob = res.data;
        if (blob.type === "application/json") {
            try {
                const json: any = JSON.parse(await blob.text());
                message.error(json.msg || "导出信息错误");
                return;
            } catch (error) {
            }
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e: any) {
            // 转换完成，创建一个a标签用于下载
            if (isSupportMsSaveOrOpenBlob()) {
                (window.navigator as NavigatorWithMsSaveOrOpenBlob).msSaveOrOpenBlob(blob, `${fileName}.csv`);
                return;
            }
            const targetLink: any = document.createElement("a");
            targetLink.download = fileName ? fileName + ".xls" : "列表.xls";
            if (typeof targetLink.download === "undefined") {
                targetLink.setAttribute("target", "_blank");
            }

            targetLink.href = e.target.result;
            targetLink.click();
        };
    }).catch(err => {
        console.log(err);
    });
    return result;
};

export function isSupportMsSaveOrOpenBlob() {
    return !!(window.navigator as NavigatorWithMsSaveOrOpenBlob).msSaveOrOpenBlob;
}

export function downloadBlob(blob: Blob, fileName: string) {
    if (isSupportMsSaveOrOpenBlob()) {
        (window.navigator as NavigatorWithMsSaveOrOpenBlob).msSaveOrOpenBlob(blob, `${fileName}`);
    } else {
        const targetLink = document.createElement("a");

        targetLink.download = `${fileName}`;

        if (typeof targetLink.download === "undefined") {
            targetLink.setAttribute("target", "_blank");
        }

        targetLink.href = window.URL.createObjectURL(blob);
        targetLink.click();
    }
}
