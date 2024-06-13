import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";
import userEvent from "@testing-library/user-event";
import { LOGIN_USER } from "graphQL/login-user/loginUser";

const mockStore = configureStore();

const mockLoginData = {
  data: {
    signUps: {
      data: [
        {
          attributes: {
            // Your mock user data here
            id: "1",
            username: "testUser",
          },
        },
      ],
    },
  },
};

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: "test@example.com",
        password: "password123",
      },
    },
    result: mockLoginData,
  },
];

describe("Login Component", () => {
  it("renders login compo", async () => {
    const store = mockStore({
      strapi: { artifacts: { logo: "mockedLogoPath" } },
    }); // Provide initial state for the store

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </Provider>
      </MockedProvider>
    );

    expect(getByText("Don't have an account? Sign up")).toBeInTheDocument();
  });

  // it("renders login form and handles login", async () => {
  //   const store = mockStore({
  //     strapi: { artifacts: { logo: "mockedLogoPath" } },
  //   }); // Provide initial state for the store

  //   const { getAllByRole, getByText, getByRole } = render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Provider store={store}>
  //         <MemoryRouter>
  //           <Login />
  //         </MemoryRouter>
  //       </Provider>
  //     </MockedProvider>
  //   );
  //   const emailInput = getAllByRole("textbox")[0];
  //   const passwordInput = getAllByRole("textbox")[1];

  //   // Simulate user input
  //   userEvent.type(emailInput, "user@gmail.com");
  //   userEvent.type(passwordInput, "user@955264");

  //   // Trigger the login action
  //   userEvent.click(getByRole("button", { name: "Login" }));

  //   // Wait for the GraphQL mutation to complete
  //   await act(async () => {
  //     await waitFor(
  //       () => {
  //         expect(getByRole("alert").getAttribute("data-variant")).toBe(
  //           "success"
  //         );
  //       },
  //       { timeout: 3000 } // Adjust the timeout based on the expected delay
  //     );
  //   });
  // });
});
