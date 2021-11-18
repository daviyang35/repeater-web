import React from "react";
import {render, screen} from "@testing-library/react";
import ReplayResult from "./ReplayResult";


describe("回放结果详情", function () {
    it("回放页", () => {
        render(<ReplayResult/>);
        expect(screen.getByText("回放详情")).toBeInTheDocument();
    });
});
