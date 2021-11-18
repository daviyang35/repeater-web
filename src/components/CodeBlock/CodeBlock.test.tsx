import React from "react";
import {render} from "@testing-library/react";
import CodeBlock from "./CodeBlock";

describe("代码段显示控件", function () {
    it("render CodeBlock", () => {

        const {container} = render(<CodeBlock mode="json" value={"aaa"}/>);
        expect(container.querySelector("#AceEditor")).toBeInTheDocument();
        // TODO: 如下断言希望能够被验证 https://github.com/securingsincity/react-ace/issues/1289
        // expect(screen.getByText("aaa")).toBeInTheDocument();
    });
});
