import React from "react";
import {render} from "@testing-library/react";
import CodeBlock from "./CodeBlock";

describe("代码段显示控件", function () {
    it("render CodeBlock", () => {
        const {container} = render(<CodeBlock value={""}/>);
        expect(container.getElementsByClassName("CodeMirror")).toBeTruthy();
    });
});
