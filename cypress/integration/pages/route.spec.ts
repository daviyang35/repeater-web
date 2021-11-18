describe("路由", function () {
    it("ReplayResult", () => {
        cy.visit("http://localhost:3000/#/replayResult");

        cy.contains("回放结果");
    });
});
