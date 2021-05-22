import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "../../pages/sign-up";
import FirebaseContext from "../../context/firebase";
import { doesUsernameExist } from "../../services/firebase";
import * as ROUTES from "../../constants/routes";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock("../../services/firebase");

describe("<SignUp />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign up page with a form submission and signs a user up", async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve("User added")),
        })),
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve("I am signed up!")),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([]));
      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "prasoon" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "prasoon chatterjee" },
      });
      await fireEvent.change(getByPlaceholderText("Email Address"), {
        target: { value: "prasoon@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("sign-up"));

      await waitFor(() => {
        expect(document.title).toEqual("Sign Up - Margatsni");
        expect(doesUsernameExist).toHaveBeenCalledWith("prasoon");
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("prasoon");
        expect(getByPlaceholderText("Full name").value).toBe(
          "prasoon chatterjee"
        );
        expect(getByPlaceholderText("Email Address").value).toBe(
          "prasoon@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeFalsy();
      });
    });
  });

  it("renders the sign up page but an error is present (username exists)", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve({})),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([false])); // [false] is returned if username exists

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "prasoon" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "prasoon chatterjee" },
      });
      await fireEvent.change(getByPlaceholderText("Email Address"), {
        target: { value: "prasoon@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("sign-up"));

      await waitFor(() => {
        expect(document.title).toEqual("Sign Up - Margatsni");
        expect(doesUsernameExist).toHaveBeenCalledWith("prasoon");
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("");
        expect(getByPlaceholderText("Full name").value).toBe(
          "prasoon chatterjee"
        );
        expect(getByPlaceholderText("Email Address").value).toBe(
          "prasoon@gmail.com"
        );
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });

  it("renders the sign up page but an error is thrown", async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() =>
              Promise.reject(new Error("Username exists"))
            ),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      doesUsernameExist.mockImplementation(() => Promise.resolve([]));

      await fireEvent.change(getByPlaceholderText("Username"), {
        target: { value: "prasoon" },
      });
      await fireEvent.change(getByPlaceholderText("Full name"), {
        target: { value: "prasoon chatterjee" },
      });
      await fireEvent.change(getByPlaceholderText("Email Address"), {
        target: { value: "prasoon@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.submit(getByTestId("sign-up"));

      await waitFor(() => {
        expect(document.title).toEqual("Sign Up - Margatsni");
        expect(doesUsernameExist).toHaveBeenCalledWith("prasoon");
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText("Username").value).toBe("prasoon");
        expect(getByPlaceholderText("Full name").value).toBe("");
        expect(getByPlaceholderText("Email Address").value).toBe("");
        expect(getByPlaceholderText("Password").value).toBe("");
        expect(queryByTestId("error")).toBeTruthy();
      });
    });
  });
});
