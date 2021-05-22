/* eslint-disable no-undef */

Cypress.Commands.add("SignIn", () => {
  cy.visit(`/login`);

  cy.contains(`Don't have an account?`).should("be.visible");
  cy.contains(`Sign Up`).should("be.visible");
  cy.get("div")
    .find("img")
    .should("be.visible")
    .should("have.attr", "alt")
    .should("contain", "iPhone with Instagram app");

  cy.get("form").within(() => {
    cy.get("button").should("be.disabled");
    cy.get("input").first().type("test@gmail.com");
    cy.get("input").last().type("test1234");
    cy.get("button").should("not.be.disabled");
    cy.contains("Login").click();
  });
});
