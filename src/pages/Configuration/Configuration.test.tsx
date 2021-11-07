import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import Configuration from "./Configuration";
import userEvent from "@testing-library/user-event";
import service from "./service";

jest.mock("./service");

const dataSource: any = [{
    id: 1,
    gmtCreate: "2021-09-14 01:37:18",
    gmtModified: "2021-09-14 02:49:26",
    appName: "todo",
    environment: "prod",
    configModel: {
        useTtl: true,
        degrade: false,
        exceptionThreshold: 1000,
        sampleRate: 10000,
        pluginsPath: null,
        httpEntrancePatterns: [
            "^/todo.*$",
        ],
        javaEntranceBehaviors: [
            {
                classPattern: "com.example.todo.*",
                methodPatterns: [
                    "*",
                ],
                includeSubClasses: false,
            },
        ],
        javaSubInvokeBehaviors: [
            {
                classPattern: "com.example.todo.*",
                methodPatterns: [
                    "*",
                ],
                includeSubClasses: false,
            },
        ],
        pluginIdentities: [
            "http",
            "java-entrance",
            "java-subInvoke",
            "hibernate",
            "spring-data-jpa",
        ],
        repeatIdentities: [
            "java",
            "http",
        ],
    },
    config: "{\n  \"useTtl\" : true,\n  \"degrade\" : false,\n  \"exceptionThreshold\" : 1000,\n  \"sampleRate\" : 10000,\n  \"pluginsPath\" : null,\n  \"httpEntrancePatterns\" : [ \"^/todo.*$\" ],\n  \"javaEntranceBehaviors\" : [ {\n    \"classPattern\" : \"com.example.todo.*\",\n    \"methodPatterns\" : [ \"*\" ],\n    \"includeSubClasses\" : false\n  } ],\n  \"javaSubInvokeBehaviors\" : [ {\n    \"classPattern\" : \"com.example.todo.*\",\n    \"methodPatterns\" : [ \"*\" ],\n    \"includeSubClasses\" : false\n  } ],\n  \"pluginIdentities\" : [ \"http\", \"java-entrance\", \"java-subInvoke\",\"hibernate\", \"spring-data-jpa\" ],\n  \"repeatIdentities\" : [ \"java\", \"http\" ]\n}",
},
];

describe("配置管理页", function () {
    it("条件搜索需要有应用，环境输入框和搜索按钮", async () => {
        (service.getModuleConfig as jest.Mock).mockResolvedValueOnce({success: true, data: []});
        render(<Configuration/>);
        const AppNameField = screen.getByPlaceholderText("请输入应用名");
        const environmentField = screen.getByPlaceholderText("请输入环境名");
        const queryButtonField = screen.getByText("查 询");

        await waitFor(() => {
            expect(AppNameField).toBeInTheDocument();
            expect(environmentField).toBeInTheDocument();
            expect(queryButtonField).toBeInTheDocument();
        });
    });

    it("用户输入搜索条件执行搜索", async () => {
        (service.getModuleConfig as jest.Mock).mockImplementation((args: any) => {
            console.log("getModuleConfig:", args);
            return new Promise(resolve => resolve({success: true, data: dataSource}));
        });

        render(<Configuration/>);

        const AppNameField = screen.getByPlaceholderText("请输入应用名");
        const environmentField = screen.getByPlaceholderText("请输入环境名");
        const queryButtonField = screen.getByText("查 询");

        userEvent.type(AppNameField, "app");
        userEvent.type(environmentField, "developer");
        userEvent.click(queryButtonField);

        await waitFor(() => {
            expect((service.getModuleConfig as jest.Mock)).toHaveBeenLastCalledWith({
                appName: "app",
                environment: "developer",
                page: 1,
                size: 10,
            });
        });
    });
});
