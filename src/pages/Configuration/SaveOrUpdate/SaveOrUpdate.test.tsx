import React from "react";
import SaveOrUpdate from "./SaveOrUpdate";
import {act, screen, waitFor} from "@testing-library/react";
import service from "./service";

jest.mock("./service");

describe("创建&更新配置信息", function () {

    beforeEach(() => {
        (service.getModuleConfig as jest.Mock).mockResolvedValue({
            success: true,
            data: {
                id: 1,
                appName: "todo",
                environment: "prod",
                configModel: {
                    pluginIdentities: [
                        "http",
                        "java-entrance",
                        "java-subInvoke",
                        "hibernate",
                        "spring-data-jpa",
                    ],
                },
            },
            message: "operate success",
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("打开为预览模式", async () => {

        act(() => {
            renderWithRouter(
                <SaveOrUpdate/>,
                {route: "/configurationDetail?mode=preview&appName=todo&environment=prod"});
        });

        expect(screen.queryByText("更 新")).toBeNull();
        expect(screen.queryByText("创 建")).toBeNull();

        await waitFor(() => {
            expect(service.getModuleConfig).toBeCalledTimes(1);
            expect(service.getModuleConfig).toBeCalledWith("todo", "prod");
        });
    });

    it("打开为创建模式", () => {
        renderWithRouter(<SaveOrUpdate/>, {route: "/configurationDetail?mode=create"});
        expect(screen.getByPlaceholderText("请输入应用名")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("请输入环境名")).toBeInTheDocument();
    });

    it("打开为编辑模式", async () => {
        renderWithRouter(<SaveOrUpdate/>, {route: "/configurationDetail?mode=edit&appName=app&environment=prod"});
        await waitFor(() => {
            expect(service.getModuleConfig).toBeCalledTimes(1);
            expect(service.getModuleConfig).toBeCalledWith("app", "prod");
            expect(screen.getByText("更 新")).toBeInTheDocument();
        });

    });

});
