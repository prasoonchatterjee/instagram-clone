/* eslint-disable no-undef */
describe("Login", () => {
  beforeEach(() => {
    cy.visit(`/login`);

    cy.contains(`Don't have an account?`).should("be.visible");
    cy.contains(`Sign Up`).should("be.visible");
    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "iPhone with Instagram app");
  });

  it("inputs email address and password and submits the form", () => {
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");
      cy.get("input").first().type("test@gmail.com");
      cy.get("input").last().type("test1234");
      cy.get("button").should("not.be.disabled");
      cy.contains("Login").click();
    });

    cy.wait(5000); // allow a snapshot of the dashboard page to be seen
  });

  it("inputs email address and password and submits the form with wrong login info", () => {
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");
      cy.get("input").first().type("test@gmail.com");
      cy.get("input").last().type("badpassword");
      cy.get("button").should("not.be.disabled");
      cy.contains("Login").click();
    });
    cy.contains(
      "The password is invalid or the user does not have a password."
    );
  });

  it("navigates to the sign up page and back again", () => {
    cy.get('[data-testid="sign-up"]').click();
    cy.contains(`Have an account?`).should("be.visible");
    cy.contains("Sign Up").should("be.visible");
    cy.get('[data-testid="login"]').click();
    cy.contains(`Don't have an account?`).should("be.visible");
    cy.contains("Login").should("be.visible");
  });
});
