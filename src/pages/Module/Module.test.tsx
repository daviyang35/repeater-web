import {render, screen} from "@testing-library/react";
import Module from "./Module";

describe("模块管理页", () => {
    it("显示模块列表", () => {
        render(<Module/>);
        screen.getByText("");
    });
});
