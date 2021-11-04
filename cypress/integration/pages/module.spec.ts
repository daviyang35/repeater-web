///<reference types="cypress" />

describe("模块管理", function () {
    it("显示模块列表", () => {
        cy.visit("http://localhost:3000/#/module");
        cy.contains("53033");
        cy.contains("已激活");
    });
});
