///<reference types="cypress" />

describe("配置管理", function () {

    it("显示配置列表", () => {
        cy.intercept({method: "GET", url: "/config/"}, {fixture: "config.json"}).as("fetch");

        cy.visit("http://localhost:3000/#/configuration");
        cy.wait("@fetch").should(() => {

            cy.contains("prod");
        });
    });
    it("搜索功能", () => {
        cy.visit("http://localhost:3000/#/configuration");


    });


});
