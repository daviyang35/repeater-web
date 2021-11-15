///<reference types="cypress" />

describe("配置管理", function () {

    it("显示配置列表", () => {
        cy.intercept({method: "GET", url: "/config/**"}, {fixture: "config.json"}).as("fetch");

        cy.visit("http://localhost:3000/#/configuration");
        cy.wait("@fetch").should(() => {
            cy.contains("prod");
        });
    });
    it("预览详情", () => {
        cy.intercept({method: "GET", url: "/config/detail"}, {
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
        }).as("fetchDetails");
        cy.visit("http://localhost:3000/#/configurationDetail?mode=privew&appName=app_verify&environment=app_env");
        cy.wait("@fetchDetails").should(() => {
            cy.contains("hibernate");
        });
    });


});
