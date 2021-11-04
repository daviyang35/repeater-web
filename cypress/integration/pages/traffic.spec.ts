///<reference types="cypress" />

describe("流量管理", function () {

    beforeEach(() => {
        cy.intercept({
            method: "GET",
            url: "/online/**",
        }, {fixture: "traffic_list.json"}).as("fetchTraffic");
    });

    it("Render Traffic Page", () => {
        cy.visit("http://localhost:3000/#/traffic");

        cy.wait("@fetchTraffic").should(() => {
            cy.findByText("127000000001163153018853610021ed").should("be.visible");
        });
    });

    it("点击回放按钮，跳转到回放页面", () => {
        cy.visit("http://localhost:3000/#/traffic");

        cy.wait("@fetchTraffic");

        cy.findByText("详 情").click();

        cy.location().should((loc) => {
            console.log(loc);
            expect(loc.hash).contains("id=127000000001163153018853610021ed");
        });
        cy.contains("基础信息");
    });
});
