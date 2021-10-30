///<reference types="cypress" />

describe("模块管理", function () {
    it("打开模块管理", () => {
        cy.visit("http://localhost:3000/#/module");
        cy.contains("模块管理");
    });
});
