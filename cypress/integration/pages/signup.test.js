/* eslint-disable no-undef */
describe("Signup", () => {
  beforeEach(() => {
    cy.visit(`/signup`);

    cy.contains(`Have an account?`).should("be.visible");
    cy.contains(`Login`).should("be.visible");
    cy.get("div")
      .find("img")
      .should("be.visible")
      .should("have.attr", "alt")
      .should("contain", "iPhone with Instagram app");
  });

  it("fill sign up form successfully", () => {
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");
      cy.get("input[placeholder = 'Username']").type("signuptest");
      cy.get("input[placeholder ='Full name']").type("test user for signup");
      cy.get("input[placeholder = 'Email Address']").type("test2@gmail.com");
      cy.get("input[placeholder = 'Password']").type("test@1234");
      cy.contains("Sign Up").click();
    });
    cy.wait(5000);
  });

  it("tries to signup with an existing username", () => {
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");
      cy.get("input[placeholder = 'Username']").type("test");
      cy.get("input[placeholder ='Full name']").type("test user");
      cy.get("input[placeholder = 'Email Address']").type("test@gmail.com");
      cy.get("input[placeholder = 'Password']").type("badpassword");
      cy.contains("Sign Up").click();
    });
    cy.contains(`That username is already taken, please try another.`);
  });

  it("navigates to the sign up page and back again", () => {
    cy.get('[data-testid="login"]').click();
    cy.contains(`Don't have an account?`).should("be.visible");
    cy.contains("Login").should("be.visible");
    cy.get('[data-testid="sign-up"]').click();
    cy.contains(`Have an account?`).should("be.visible");
    cy.contains("Sign Up").should("be.visible");
  });
});
