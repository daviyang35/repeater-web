import React from "react";
import {screen, waitFor} from "@testing-library/react";
import App from "./App";
import Login from "@/pages/Login";
import accountApi from "@/services/Account";

jest.mock("@/services/Account");
jest.mock("@/pages/Login");
jest.mock("@/utils/request");

describe("路由", () => {

    test("render layouts", async () => {
        (accountApi.roleScope as jest.Mock).mockResolvedValueOnce({
            data: [],
        });
        (accountApi.deptScope as jest.Mock).mockResolvedValueOnce({
            data: [],
        });

        renderWithRouter(<App/>, {route: "/"});
        await waitFor(() => {
            expect(screen.getByTitle("关于我们")).toBeInTheDocument();
        });
    });

    test("render login", async () => {
        (Login as jest.Mock).mockImplementation(() => <div>LoginMock</div>);
        renderWithRouter(<App/>, {route: "/login"});

        await waitFor(() => {
            expect(screen.getByText("LoginMock")).toBeInTheDocument();
        });
    });
});

