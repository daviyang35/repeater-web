import {message} from "antd";

import copy from "copy-to-clipboard";

/**
 *
 * @param text 要复制的内容
 * @param successTip? 复制成功的弹窗文本
 * @param errTip? 复制失败的弹窗文本
 */
const Copy = (text: string, successTip: string = "已经成功复制到剪切板", errTip: string = "复制到剪切板失败") => {
    const result = copy(text);
    if (result) {
        message.success(successTip);
    } else {
        message.error(errTip);
    }
};
export default Copy;
