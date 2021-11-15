import React from "react";
import SaveOrUpdate from "./SaveOrUpdate";
import {act, screen, waitFor} from "@testing-library/react";
import service from "./service";

jest.mock("./service");

describe("保存&更新配置信息", function () {

    it("打开为预览模式", async () => {
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

        act(() => {
            renderWithRouter(
                <SaveOrUpdate/>,
                {route: "/configurationDetail?mode=preview&appName=todo&environment=prod"});
        });

        expect(screen.getByText("更 新")).toBeInTheDocument();

        await waitFor(() => {
            expect(service.getModuleConfig).toBeCalledTimes(1);
            expect(service.getModuleConfig).toBeCalledWith("todo", "prod");
            
            // expect(screen.getByText("todo")).toBeInTheDocument();
            // expect(screen.getByText("prod")).toBeInTheDocument();
            // expect(screen.getByText("这是")).toBeInTheDocument();
        });
    });

    // it("打开为创建模式", () => {
    //     renderWithRouter(<SaveOrUpdate/>, {route: "/configurationDetail?mode=create"});
    //
    // });
    //
    // it("打开为编辑模式", () => {
    //     renderWithRouter(<SaveOrUpdate/>, {route: "/configurationDetail?mode=edit"});
    //
    // });
});
