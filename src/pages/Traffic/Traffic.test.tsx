import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Traffic from "./Traffic";
import repeaterApi from "@/services/Repeater";

jest.mock("@/services/Repeater");

describe("在线流量", () => {
    test("render list", async () => {
        (repeaterApi.getOnline as jest.Mock).mockResolvedValueOnce({
            data: [{
                "id": 15,
                "gmtCreate": "2021-09-14 02:49:49",
                "gmtRecord": "2021-09-14 02:49:49",
                "appName": "todo",
                "environment": "prod",
                "host": "127.0.0.1",
                "traceId": "127000000001163153018853610021ed",
                "entranceDesc": "http://127.0.0.1:8080/todo",
            },
            ],
            success: true,
            message: null,
            count: 14,
            "totalPage": 2,
            "pageSize": 10,
            "pageIndex": 1,
        });

        render(<Traffic/>);
        let byText = screen.getByText("应用名");
        expect(byText).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("127000000001163153018853610021ed")).toBeInTheDocument();
        });
    });

    test("render message when error occurred", async () => {
        (repeaterApi.getOnline as jest.Mock).mockResolvedValueOnce({
            data: [],
            success: false,
        });

        render(<Traffic/>);

        await waitFor(() => {
            expect(screen.getByText("网络错误，请稍后再试。")).toBeInTheDocument();
        });
    });

    test("render message when network error", async () => {
        (repeaterApi.getOnline as jest.Mock).mockRejectedValueOnce("网络错误");

        render(<Traffic/>);

        await waitFor(() => {
            expect(screen.getByText("网络错误，请稍后再试。")).toBeInTheDocument();
        });
    });
});
