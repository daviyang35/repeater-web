import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Regress from "./Regress";
import userEvent from "@testing-library/user-event";
import service from "./service";

jest.mock("./service");

describe("测试页面", function () {
    it("测试页", () => {
        const {container} = render(<Regress/>);
        expect(screen.getByText("/regress/slogan")).toBeInTheDocument();
        expect(screen.getByText("/regress/get/repeater/3")).toBeInTheDocument();
        expect(screen.getByText("/regress/getWithCache/repeater")).toBeInTheDocument();
        
        expect(container.querySelector("#AceEditor")).toBeInTheDocument();
    });

    it("请求 slogan", async () => {
        render(<Regress/>);

        const slogan = screen.getByText("/regress/slogan");
        userEvent.click(slogan);

        await waitFor(() => {
            expect(service.slogan).toHaveBeenCalled();
        });
    });

    it("请求 repeater/3", async () => {
        render(<Regress/>);

        const repeater3 = screen.getByText("/regress/get/repeater/3");
        userEvent.click(repeater3);

        await waitFor(() => {
            expect(service.repeater3).toHaveBeenCalled();
        });
    });

    it("请求 getWithCache/repeater", async () => {
        render(<Regress/>);

        const getWithCache = screen.getByText("/regress/getWithCache/repeater");
        userEvent.click(getWithCache);

        await waitFor(() => {
            expect(service.getWithCache).toHaveBeenCalled();
        });
    });
});
