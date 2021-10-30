///<reference types="cypress" />

describe("配置管理", function () {
    it("打开配置管理页面", () => {
        cy.visit("http://localhost:3000/#/manage");
        cy.contains("配置管理");
    });

    it("显示配置列表", () => {
        cy.intercept({method: "GET", url: "/config/"}, {
            data: [{
                id: 1,
                gmtCreate: "2021-09-14 01:37:18",
                gmtModified: "2021-09-14 02:49:26",
                appName: "todo",
                environment: "prod",
                configModel: {
                    exceptionThreshold: 1000,
                    sampleRate: 10000,
                    pluginIdentities: [
                        "http",
                        "java-entrance",
                        "java-subInvoke",
                        "hibernate",
                        "spring-data-jpa",
                    ],
                },
            },
            ],
            success: true,
            message: null,
            count: 1,
            totalPage: 1,
            pageSize: 10,
            pageIndex: 1,
        }).as("fetch");

        cy.visit("http://localhost:3000/#/manage");
        cy.contains("prod");
    });
});
