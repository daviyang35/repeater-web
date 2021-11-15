import React from "react";
import {render} from "@testing-library/react";
import InstallModal from "./InstallModal";

describe("模块安装模态-对话框", function () {
    it("render", () => {
        const onCreate = jest.fn();
        const onCancel = jest.fn();
        render(<InstallModal visible={true} onCreate={onCreate} onCancel={onCancel}/>);
    });
});
