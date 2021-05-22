/* eslint-disable no-undef */
describe("Dashboard", () => {
  before(() => {
    cy.SignIn();
  });

  it("logs the user in and shows the dashboard and does basic checks around the UI", () => {
    cy.get("body").within(() => {
      cy.wait(5000);
      cy.contains("test"); // username in the sidebar
      cy.contains("test user"); // full name in the sidebar
      cy.contains("Suggestions for you"); // if user has suggestions
    });
  });

  it("add a comment to a photo", () => {
    cy.get(
      `form[data-testid='add-comment-submit-hlkBlvtccNvSYYQzj2Jh']`
    ).within(() => {
      cy.get("[data-testid='add-comment-hlkBlvtccNvSYYQzj2Jh']").type(
        "Amazing photo!"
      );
      cy.contains("Post").click();
    });
  });

  it("likes a photo", () => {
    cy.get('[data-testid="like-photo-hlkBlvtccNvSYYQzj2Jh"]').click();
  });

  it("signs out", () => {
    cy.get('button[title="Sign Out"]').click();
    cy.wait(1000);
    cy.contains("Don't have an account?"); // back on the login page
  });
});
