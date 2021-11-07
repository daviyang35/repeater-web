import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Module from "./Module";
import service from "./service";

jest.mock("./service");

describe("模块管理页", () => {
    it("查看模块列表", async () => {
        (service.getModule as jest.Mock).mockResolvedValue({
            success: true,
            count: 1,
            totalPage: 1,
            pageSize: 10,
            pageIndex: 1,
            data: [
                {
                    "id": 2,
                    "gmtCreate": "2021-09-14 02:22:34",
                    "gmtModified": "2021-09-14 03:07:24",
                    "appName": "todo",
                    "environment": "prod",
                    "ip": "127.0.0.1",
                    "port": "53033",
                    "version": "1.0.0",
                    "status": "ACTIVE",
                }, {
                    "id": 1,
                    "gmtCreate": "2021-09-14 02:22:34",
                    "gmtModified": "2021-09-14 03:07:24",
                    "appName": "todo",
                    "environment": "prod",
                    "ip": "127.0.0.1",
                    "port": "53033",
                    "version": "1.0.0",
                    "status": "FROZEN",
                },
            ],
        });
        render(<Module/>);
        const byText = screen.getByText("版本号");
        await waitFor(() => {
            expect(byText).toBeInTheDocument();
            expect(screen.getByText("已激活")).toBeInTheDocument();
            expect(screen.getByText("未激活")).toBeInTheDocument();
        });
    });
});
