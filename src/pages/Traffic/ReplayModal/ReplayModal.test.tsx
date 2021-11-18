import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import ReplayModal from "./ReplayModal";
import userEvent from "@testing-library/user-event";

describe("回放对话框", function () {
    it("render contain appName traceId visbile", () => {
        render(<ReplayModal visible={true}/>);
        expect(screen.getByText("机器")).toBeInTheDocument();
        expect(screen.getByText("MOCK")).toBeInTheDocument();
    });

    it("取消回调", async () => {
        const cancel = jest.fn();
        render(<ReplayModal onCancel={cancel} visible={true}/>);

        userEvent.click(screen.getByText("取 消"));

        await waitFor(() => {
            expect(cancel).toBeCalledTimes(1);
        });
    });
});
