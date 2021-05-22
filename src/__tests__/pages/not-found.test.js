import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../../pages/not-found";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

describe("<NotFound />", () => {
  it("renders the not found page with a logged in user", async () => {
    const { getByText, getByTitle } = render(
      <Router>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={{ user: {} }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );

    expect(getByText("Not Found!")).toBeTruthy();
    expect(document.title).toEqual("Not Found - Margatsni");
    expect(getByTitle("Sign Out")).toBeTruthy();
  });

  it("renders the not found page with no active logged in user", async () => {
    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{}}>
          <UserContext.Provider value={{ user: null }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    );
    expect(getByText("Not Found!")).toBeTruthy();
    expect(document.title).toEqual("Not Found - Margatsni");
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
  });
});
