/* eslint-disable no-undef */
describe("Profile", () => {
  it("goes to a profile page and validates the UI without logging in", () => {
    cy.visit("/p/raphael");

    cy.get("body").within(() => {
      cy.wait(5000);
      cy.get("div").should("contain.text", "raphael");
      cy.get("div").should("contain.text", "Raffaello Sanzio da Urbino");
      cy.get("div").should("contain.text", "5 photos");
      cy.get("div").should("contain.text", "4 followers");
      cy.get("div").should("contain.text", "0 following");
    });
  });

  it("logs an user and checks raphael profile page and toggles following him", () => {
    cy.SignIn();
    cy.visit("/p/raphael");
    cy.wait(3000);
    cy.contains("Unfollow").click();
    cy.contains("Follow").click();
  });
});
